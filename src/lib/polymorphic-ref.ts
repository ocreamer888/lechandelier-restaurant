import React from "react";

export function polymorphicForwardRef<
  E extends React.ElementType,
  P
>(
    render: (props: React.PropsWithoutRef<P>, ref: React.Ref<React.ComponentRef<E>>) => React.ReactElement | null
) {
  return React.forwardRef(render) as <El extends E = E>(
    props: P & { as?: El } & React.RefAttributes<React.ComponentRef<El>>
  ) => React.ReactElement | null;
}