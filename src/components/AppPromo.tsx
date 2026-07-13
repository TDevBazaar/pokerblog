import Image from "next/image";
import { CheckCircle2, Download, Play, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ButtonLink";

export function AppPromo() {
  const benefits = [
    "Simula situaciones de Texas Hold'em",
    "Aprende si una mano inicial es recomendable",
    "Practica decisiones sin riesgo",
    "Mejora tu comprensión de probabilidades",
  ];

  return (
    <section className="surface-card overflow-hidden">
      <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded bg-poker/10 px-3 py-1 text-sm font-semibold text-poker">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Herramienta educativa
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Practica con Proker Simulator
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Proker Simulator te ayuda a simular manos, analizar decisiones y practicar póker sin apostar dinero.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm leading-6 text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-poker" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={siteConfig.googlePlayUrl}
              external
              icon={<Download className="h-4 w-4" aria-hidden="true" />}
            >
              Descargar app
            </ButtonLink>
            <ButtonLink
              href="/app/proker-simulator"
              variant="secondary"
              icon={<Play className="h-4 w-4" aria-hidden="true" />}
            >
              Ver cómo funciona
            </ButtonLink>
          </div>
          {/* <p className="mt-5 rounded border border-gold/30 bg-gold/10 p-3 text-sm leading-6 text-gold">
            Proker Simulator es una herramienta educativa. No es una app de apuestas ni garantiza ganancias.
          </p> */}
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-night p-5">
          <div className="absolute inset-0 bg-site-radial opacity-80" />
          <div className="relative mx-auto max-w-52 overflow-hidden rounded-[1.6rem] border border-white/20 bg-carbon p-2 shadow-glow">
            <Image
              src="/images/app/proker-simulator-table.jpg"
              alt="Pantalla de Proker Simulator simulando una mano de Texas Hold'em"
              width={720}
              height={1616}
              className="h-auto w-full rounded-[1.25rem]"
              sizes="(min-width: 768px) 208px, 70vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
