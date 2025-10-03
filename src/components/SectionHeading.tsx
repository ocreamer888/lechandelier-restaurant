import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
};

export default function SectionHeading({ title, subtitle, align = "left", id }: Props) {
  return (
    <div className="mb-8" id={id}>
      <h2 className={`section-title font-script font-extrabold tracking-tight text-7xl! ${align === "center" ? "text-center" : ""}`}>{title}</h2>
      {subtitle ? (
        <p className={`section-subtitle text-lg text-white/80! ${align === "center" ? "mx-auto text-center" : ""}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}