"use client";
import Link from "next/link";
import React from "react";

type ElementType = React.ElementType;

type Props<E extends ElementType> = {
  as?: E;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  ariaLabel?: string;
} & Omit<
  React.ComponentPropsWithRef<E>,
  "as" | "className" | "children" | "onClick" | "type" | "aria-label"
>;

type DynamicNeumorphicButtonComponent = <E extends ElementType = "button">(
  props: Props<E> & { ref?: React.Ref<React.ComponentRef<E>> }
) => React.ReactElement | null;

function DynamicNeumorphicButtonImpl(
  props: React.PropsWithoutRef<Props<ElementType>>,
  ref: React.Ref<HTMLElement>
) {
  const {
    as,
    children,
    className,
    onClick,
    type = "button",
    fullWidth = false,
    ariaLabel,
    ...rest
  } = props;
  
  const [pressed, setPressed] = React.useState(false);

  const classes = [
    "neumorphic-button",
    pressed && "neumorphic-button-pressed",
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const common = {
    className: classes,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") setPressed(true);
    },
    onKeyUp: () => setPressed(false),
    onClick,
    "aria-label": ariaLabel,
  };

  const href = (rest as { href?: string })?.href as string | undefined;

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          {...common}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(rest as Omit<React.ComponentPropsWithRef<typeof Link>, 'href' | 'className' | 'aria-label' | 'onClick'>)}
      >
        {children}
      </Link>
    );
  }

  const Comp = (as || "button") as ElementType;

  return (
    <Comp
      ref={ref}
      {...rest}
      {...common}
      {...(Comp === "button" ? { type } : {})}
    >
      {children}
    </Comp>
  );
}

const DynamicNeumorphicButton = React.forwardRef(
  DynamicNeumorphicButtonImpl
) as DynamicNeumorphicButtonComponent;

export default DynamicNeumorphicButton;