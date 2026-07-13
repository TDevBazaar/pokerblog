"use client";

import { RANGO_A_LETRA, PALO_A_SIMBOLO } from "./lib/mazo";
import type { Carta } from "./lib/types";

type Props = {
  carta: Carta;
  oculta?: boolean;
  pequena?: boolean;
  className?: string;
};

const esRojo = (palo: Carta["palo"]) => palo === "hearts" || palo === "diamonds";

export function CartaVisual({ carta, oculta, pequena, className = "" }: Props) {
  if (oculta) {
    return (
      <div
        className={`flex items-center justify-center rounded-md border border-white/20 bg-gradient-to-br from-poker/60 to-poker/30 font-bold text-white/60 shadow-sm ${pequena ? "h-12 w-9 text-xs" : "h-16 w-12 text-sm"} ${className}`}
      >
        ?
      </div>
    );
  }

  const letra = RANGO_A_LETRA[carta.rango];
  const simbolo = PALO_A_SIMBOLO[carta.palo];
  const rojo = esRojo(carta.palo);

  return (
    <div
      className={`flex shrink-0 flex-col justify-between rounded-md border border-white/20 bg-white px-1.5 py-1 text-night shadow-sm ${pequena ? "h-12 w-9" : "h-16 w-12"} ${className}`}
    >
      <span className={`text-sm font-bold leading-none ${pequena ? "text-xs" : "text-sm"}`}>
        {letra}
      </span>
      <span
        className={`text-right text-base leading-none ${pequena ? "text-xs" : "text-base"} ${rojo ? "text-red-600" : "text-neutral-950"}`}
      >
        {simbolo}
      </span>
    </div>
  );
}
