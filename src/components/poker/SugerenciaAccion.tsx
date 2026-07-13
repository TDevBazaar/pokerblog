"use client";

import { ArrowUp, Hand, X } from "lucide-react";
import type { Sugerencia } from "./lib/types";

type Props = {
  sugerencia: Sugerencia;
};

const ICONOS = {
  raise: ArrowUp,
  call: Hand,
  fold: X,
};

const COLORES = {
  raise: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  call: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  fold: "border-red-500/30 bg-red-500/10 text-red-400",
};

const TRADUCCION: Record<string, string> = {
  raise: "Sube",
  call: "Iguala",
  fold: "Retírate",
};

export function SugerenciaAccion({ sugerencia }: Props) {
  const Icon = ICONOS[sugerencia.accion];
  const colorClass = COLORES[sugerencia.accion];

  return (
    <div className={`space-y-2 rounded-lg border p-3 md:space-y-3 md:p-4 ${colorClass}`}>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 md:h-10 md:w-10">
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        <div>
          <p className="text-base font-bold md:text-lg">
            {TRADUCCION[sugerencia.accion]}
            {sugerencia.cantidad && (
              <span className="ml-1 text-xs font-normal opacity-80 md:ml-2 md:text-sm">
                {sugerencia.cantidad}
              </span>
            )}
          </p>
        </div>
      </div>
      <p className="text-[11px] leading-5 opacity-80 md:text-xs">{sugerencia.explicacion}</p>
    </div>
  );
}
