import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PokerSimulator } from "@/components/poker/PokerSimulator";

export const metadata: Metadata = {
  title: "Simulador de mesa de póker — Proker Simulator",
  description:
    "Simula manos de Texas Hold'em en una mesa virtual. Selecciona cartas, calcula equidad y recibe sugerencias de acción.",
};

export default function SimuladorPage() {
  return (
    <main>
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Herramientas", href: "/herramientas" },
              { label: "Simulador de mesa" },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold text-poker">Herramienta interactiva</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Simulador de mesa de póker
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Crea una mesa virtual, elige tus cartas y las comunitarias, y descubre tu
              probabilidad de ganar con simulación Monte Carlo.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <PokerSimulator />
      </Container>
    </main>
  );
}
