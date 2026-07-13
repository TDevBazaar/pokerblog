import type { Metadata } from "next";
import Image from "next/image";
import {
  CheckCircle2,
  Download,
  GraduationCap,
  Play,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Proker Simulator: practica mejores decisiones de póker",
  description:
    "Landing educativa de Proker Simulator: simula manos, analiza decisiones y aprende Texas Hold'em sin apuestas ni dinero real.",
  path: "/app/proker-simulator",
});

const benefits = [
  "Practica sin apostar dinero",
  "Analiza manos de Texas Hold'em",
  "Aprende conceptos de odds y decisiones",
  "Ideal para principiantes",
  "No es casino",
  "No permite apuestas",
  "No garantiza ganancias",
];

const steps = [
  {
    title: "Configura la situación",
    description: "Introduce cartas, posición y acción previa para estudiar el escenario.",
  },
  {
    title: "Revisa señales clave",
    description: "Observa fuerza de mano, outs, textura de mesa y riesgos comunes.",
  },
  {
    title: "Practica la decisión",
    description: "Compara opciones como jugar, retirarte o revisar mejor la mano.",
  },
];

const faqs = [
  {
    question: "¿Proker Simulator permite jugar con dinero real?",
    answer:
      "No. Proker Simulator es una herramienta educativa y no permite apuestas ni juego con dinero real.",
  },
  {
    question: "¿La app garantiza ganancias?",
    answer:
      "No. La app ayuda a practicar conceptos y decisiones, pero no garantiza ganancias ni resultados concretos.",
  },
  {
    question: "¿Sirve para principiantes?",
    answer:
      "Sí. Está pensada para estudiar Texas Hold'em, manos iniciales, probabilidades y decisiones básicas.",
  },
];

export default function ProkerSimulatorPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <JsonLd data={faqJsonLd} />
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Breadcrumbs items={[{ label: "Proker Simulator" }]} />
            <div className="mt-10 flex items-center gap-3">
              <Image
                src="/images/app/mipmap-xxxhdpi/ic_launcher.png"
                alt="Logo de Proker Simulator"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <span className="text-sm font-semibold text-poker">App educativa</span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Proker Simulator: practica mejores decisiones de póker
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Simula manos, analiza situaciones y aprende cuándo jugar, retirarte o revisar mejor una decisión.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={siteConfig.googlePlayUrl}
                external
                icon={<Download className="h-4 w-4" aria-hidden="true" />}
              >
                Descargar en Google Play
              </ButtonLink>
              <ButtonLink
                href="/herramientas/simulador"
                variant="secondary"
                icon={<Play className="h-4 w-4" aria-hidden="true" />}
              >
                Probar en la web
              </ButtonLink>
            </div>
          </div>

          <div className="surface-card relative overflow-hidden p-6">
            <div className="absolute inset-0 bg-site-radial" />
            <div className="relative mx-auto max-w-72 overflow-hidden rounded-[2rem] border border-white/20 bg-carbon p-2 shadow-glow">
              <Image
                src="/images/app/proker-simulator-table.jpg"
                alt="Pantalla principal de Proker Simulator con mesa, cartas y recomendación educativa"
                width={720}
                height={1616}
                priority
                className="h-auto w-full rounded-[1.6rem]"
                sizes="(min-width: 1024px) 288px, 76vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-16 py-16">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Qué es"
            title="Un entrenador educativo para estudiar decisiones"
            description="Proker Simulator conecta guías, simulación y análisis de manos para ayudarte a entender el porqué de cada decisión."
          />
          <div className="surface-card p-6">
            <p className="text-base leading-8 text-muted">
              No reemplaza el criterio propio ni predice resultados. Su objetivo es ayudarte a practicar escenarios frecuentes de Texas Hold’em, detectar riesgos y reforzar conceptos como outs, posición y fuerza relativa de la mano.
            </p>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Para quién es"
            title="Diseñada para principiantes y estudiantes del juego"
            description="Ideal si quieres entender manos iniciales, probabilidades, errores comunes y revisión de decisiones sin entorno de apuestas."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Principiantes", "Aprende reglas, ranking y acciones básicas."],
              ["Jugadores recreativos", "Ordena conceptos y revisa escenarios típicos."],
              ["Estudiantes de estrategia", "Practica decisiones preflop y postflop con contexto."],
            ].map(([title, description]) => (
              <article key={title} className="surface-card p-5">
                <GraduationCap className="h-6 w-6 text-poker" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Cómo funciona"
            title="Tres pasos para practicar una mano"
            description="La app organiza la información para que revises decisiones de forma metódica."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="surface-card p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-action text-sm font-bold text-night">
                  {index + 1}
                </span>
                <h2 className="mt-5 text-lg font-semibold text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Beneficios"
            title="Aprendizaje práctico sin casino"
            description="Todo el enfoque está puesto en educación, simulación y comprensión."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="h-5 w-5 text-poker" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Capturas"
            title="Vista previa de la experiencia"
            description="Capturas reales de la app Android usadas como referencia visual del producto."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Simulador de mesa",
                description: "Mesa visual para estudiar cartas, fases de la mano y recomendación sugerida.",
                src: "/images/app/proker-simulator-table.jpg",
                alt: "Pantalla de Proker Simulator con mesa de póker, flop y porcentaje de victoria",
              },
              {
                title: "Probabilidades por mano",
                description: "Vista de combinaciones posibles y porcentajes para entender resultados probables.",
                src: "/images/app/proker-simulator-odds.jpg",
                alt: "Pantalla de Proker Simulator con ranking de combinaciones y probabilidades",
              },
              {
                title: "Ejemplo de análisis",
                description: "Pantalla de ejemplo con análisis de mano y recomendación educativa.",
                src: "/images/app/pokerejemp.jpg",
                alt: "Pantalla de ejemplo de Proker Simulator con análisis de mano",
              },
            ].map((screen) => (
              <article key={screen.title} className="surface-card overflow-hidden p-5">
                <div className="mx-auto max-w-64 overflow-hidden rounded-[1.6rem] border border-white/20 bg-carbon p-2 shadow-glow">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={720}
                    height={1616}
                    className="h-auto w-full rounded-[1.25rem]"
                    sizes="(min-width: 768px) 256px, 76vw"
                  />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-white">{screen.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{screen.description}</p>
              </article>
            ))}
          </div>
        </section>

        <FAQSection items={faqs} />

        <section className="surface-card border-gold/30 p-6">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Aviso responsable</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Proker Simulator es una herramienta educativa. No es casino, no permite apuestas, no procesa dinero real y no garantiza ganancias. El contenido del blog y la app se orienta a aprendizaje, simulación y práctica responsable.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
