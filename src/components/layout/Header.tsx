"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/90 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link className="focus-ring flex items-center gap-3 rounded" href="/" onClick={() => setOpen(false)}>
          <Image
            src="/images/app/mipmap-xxxhdpi/ic_launcher.png"
            alt="Proker Simulator"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-display text-lg font-bold text-white">Proker Simulator</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegacion principal">
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                className={cn(
                  "focus-ring rounded px-3 py-2 text-sm font-medium transition",
                  active ? "bg-white/10 text-poker" : "text-muted hover:text-white",
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded bg-action px-4 py-2 text-sm font-semibold text-night transition hover:bg-poker"
            href="/app/proker-simulator"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Descargar App
          </Link>
        </div>

        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 text-white lg:hidden"
          type="button"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-night/95 lg:hidden">
          <nav className="section-shell grid gap-2 py-5" aria-label="Menu movil">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                className="focus-ring rounded px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="focus-ring mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-action px-4 py-3 text-sm font-semibold text-night"
              href="/app/proker-simulator"
              onClick={() => setOpen(false)}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar App
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
