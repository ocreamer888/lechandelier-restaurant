"use client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  ariaLabel?: string;
};

export default function NeumorphicButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  fullWidth = false,
  ariaLabel,
}: Props) {
  const [pressed, setPressed] = useState(false);

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

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} {...common}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} {...(common as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}