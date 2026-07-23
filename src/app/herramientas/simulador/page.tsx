import type { Metadata } from "next";

import { SimuladorContent } from "@/components/pages/SimuladorContent";

export const metadata: Metadata = {
  title: "Simulador de mesa de póker — Proker Simulator",
  description:
    "Simula manos de Texas Hold'em en una mesa virtual. Selecciona cartas, calcula equidad y recibe sugerencias de acción.",
};

export default function SimuladorPage() {
  return (
    <main>
      <SimuladorContent />
    </main>
  );
}
