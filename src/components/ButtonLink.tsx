import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
};

const variants = {
  primary:
    "bg-action text-night hover:bg-poker border border-action shadow-glow",
  secondary:
    "border border-gold/70 text-gold hover:bg-gold/10",
  ghost:
    "border border-white/10 text-ink hover:border-poker/60 hover:bg-white/5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon,
}: ButtonLinkProps) {
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold transition",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {!icon && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
