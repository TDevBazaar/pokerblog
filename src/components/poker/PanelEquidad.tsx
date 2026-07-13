"use client";

import type { ResultadoEquidad } from "./lib/types";

type Props = {
  resultado: ResultadoEquidad;
};

export function PanelEquidad({ resultado }: Props) {
  const maxBar = Math.max(resultado.win, resultado.tie, resultado.lose) || 1;
  const colorBar = (valor: number) => {
    if (valor > 40) return "bg-emerald-500";
    if (valor > 20) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2 md:space-y-3">
      <h3 className="text-xs font-semibold text-white md:text-sm">Equidad</h3>
      <div className="space-y-1.5 md:space-y-2">
        {[
          { label: "Gana", value: resultado.win, color: "bg-emerald-500" },
          {
            label: "Empata",
            value: resultado.tie,
            color: "bg-amber-500",
          },
          { label: "Pierde", value: resultado.lose, color: "bg-red-500" },
        ].map((item) => (
          <div key={item.label} className="space-y-0.5 md:space-y-1">
            <div className="flex justify-between text-[11px] md:text-xs">
              <span className="text-muted">{item.label}</span>
              <span className="font-bold text-white">{item.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5 md:h-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${(item.value / maxBar) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-muted md:text-[10px]">
        {resultado.totalIteraciones.toLocaleString()} iteraciones simuladas
      </p>
    </div>
  );
}
