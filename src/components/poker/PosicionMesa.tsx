"use client";

import type { Posicion } from "./lib/types";

type Props = {
  posicion: Posicion;
  activa?: boolean;
  className?: string;
};

const COLORES: Record<string, string> = {
  UTG: "bg-blue-600/60 text-blue-200",
  "UTG+1": "bg-blue-500/60 text-blue-200",
  MP: "bg-purple-600/60 text-purple-200",
  MP2: "bg-purple-500/60 text-purple-200",
  MP3: "bg-purple-400/60 text-purple-200",
  CO: "bg-cyan-600/60 text-cyan-200",
  BTN: "bg-amber-600/60 text-amber-200",
  SB: "bg-orange-600/60 text-orange-200",
  BB: "bg-red-600/60 text-red-200",
};

export function PosicionMesa({ posicion, activa, className = "" }: Props) {
  return (
    <span
      className={`rounded px-2 py-0.5 text-[10px] font-bold ${COLORES[posicion] ?? "bg-white/10 text-muted"} ${
        activa ? "ring-2 ring-white" : ""
      } ${className}`}
    >
      {posicion}
    </span>
  );
}
