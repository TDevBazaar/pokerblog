import Image from "next/image";
import { BarChart3, Download, Play, ShieldCheck, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ButtonLink";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-site-radial">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,23,0.15),#0a0e17)]" />
      <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-poker/30 bg-poker/5 px-3.5 py-1.5 text-xs font-semibold text-poker backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-poker" aria-hidden="true" />
            Educación de póker 100% libre de apuestas
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.35rem]">
            Aprende póker desde cero y{" "}
            <span className="text-poker">
              mejora tus decisiones
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Guías, probabilidades, estrategia básica y herramientas para practicar Texas Hold’em sin apostar dinero.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/aprende-poker">Empezar desde cero</ButtonLink>
            <ButtonLink
              href="/herramientas/simulador"
              variant="secondary"
              icon={<Play className="h-4 w-4" aria-hidden="true" />}
            >
              Probar en la web
            </ButtonLink>
          </div>
        </div>

        <div className="relative lg:pl-6">
          <div className="absolute -inset-8 rounded-full bg-poker/15 blur-3xl opacity-60 animate-pulse duration-[6000ms]" />
          <div className="surface-card relative overflow-hidden p-4 sm:p-5 rounded-2xl border border-white/10 bg-panel/30 backdrop-blur-md shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(136,217,130,0.16),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(233,195,73,0.12),transparent_30%)]" />
            <div className="relative flex items-start justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-poker/35 bg-poker/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-poker backdrop-blur">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  App educativa
                </div>
                <h2 className="mt-3 max-w-sm font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                  Simula manos y analiza decisiones
                </h2>
              </div>
              <span className="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-ink/80 sm:inline-flex">
                Texas Hold’em
              </span>
            </div>

            <div className="relative mt-5 h-[27rem] overflow-hidden rounded-xl border border-white/10 bg-night/80 px-4 pt-5 sm:h-[29rem] lg:h-[26.5rem]">
              <div className="absolute left-4 top-4 z-20 rounded-xl border border-poker/30 bg-night/95 p-3.5 shadow-glow backdrop-blur-md transition-all duration-300 hover:border-poker/50">
                <div className="flex items-center gap-2 text-xs font-bold text-poker">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  Win rate
                </div>
                <p className="mt-1 font-display text-3xl font-black text-white">59.7%</p>
              </div>

              <div className="absolute right-4 top-20 z-20 hidden rounded-xl border border-gold/30 bg-night/95 p-3.5 backdrop-blur-md sm:block transition-all duration-300 hover:border-gold/50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Acción sugerida</p>
                <p className="mt-1 text-lg font-black uppercase text-white tracking-wide">subir (raise)</p>
              </div>

              <div className="absolute bottom-4 left-4 z-20 max-w-48 rounded-xl border border-white/15 bg-night/95 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-white/35">
                <div className="flex items-center gap-2 text-xs font-bold text-poker">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Práctica sin riesgo
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-ink/85">
                  Simulación 100% educativa. Sin dinero real.
                </p>
              </div>

              <div className="absolute bottom-5 right-4 z-20 hidden gap-2.5 lg:flex" aria-hidden="true">
                {[
                  ["10", "♣", "text-neutral-950"],
                  ["J", "♥", "text-red-600"],
                ].map(([value, suit, color]) => (
                  <span
                    key={`${value}-${suit}`}
                    className="flex h-16 w-11 flex-col justify-between rounded-md border border-white/30 bg-white px-2 py-1 text-night shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-2"
                  >
                    <span className="text-base font-bold">{value}</span>
                    <span className={`text-right text-lg leading-none ${color}`}>{suit}</span>
                  </span>
                ))}
              </div>

              <div className="relative z-10 mx-auto h-[25.5rem] max-w-[13.5rem] overflow-hidden rounded-[1.7rem] border border-white/20 bg-carbon p-2 shadow-glow sm:h-[27.5rem] sm:max-w-[14.5rem] lg:h-[25rem]">
                <Image
                  src="/images/app/proker-simulator-table.jpg"
                  alt="Pantalla de Proker Simulator simulando una mano de Texas Hold’em"
                  width={720}
                  height={1616}
                  priority
                  className="h-full w-full rounded-[1.35rem] object-cover object-top"
                  sizes="(min-width: 1024px) 232px, 64vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
