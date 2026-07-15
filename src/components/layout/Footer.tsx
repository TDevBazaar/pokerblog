import Image from "next/image";
import Link from "next/link";

import { AdBanner } from "@/components/AdBanner";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <AdBanner />
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link className="inline-flex items-center gap-3" href="/">
            <Image
              src="/images/app/mipmap-xxxhdpi/ic_launcher.png"
              alt="Proker Simulator"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-display text-lg font-bold text-white">Proker Simulator</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            Blog educativo para aprender reglas, manos, probabilidades y estrategia de Texas Hold’em con enfoque responsable.
          </p>
          <p className="mt-5 rounded border border-gold/30 bg-gold/10 p-4 text-sm leading-6 text-gold">
            {siteConfig.legalNotice}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Enlaces principales</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-poker" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted">
            {siteConfig.legalLinks.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-poker" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-5 text-muted/80">
            Proker Simulator no permite jugar con dinero real y no garantiza ganancias.
          </p>
        </div>
      </div>
    </footer>
  );
}
