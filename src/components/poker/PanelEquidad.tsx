"use client";

import type { ResultadoEquidad } from "./lib/types";
import { useLanguage } from "@/i18n";

type Props = {
  resultado: ResultadoEquidad;
};

export function PanelEquidad({ resultado }: Props) {
  const { t } = useLanguage();
  const maxBar = Math.max(resultado.win, resultado.tie, resultado.lose) || 1;

  return (
    <div className="space-y-2 md:space-y-3">
      <h3 className="text-xs font-semibold text-white md:text-sm">{t("equity.title")}</h3>
      <div className="space-y-1.5 md:space-y-2">
        {[
          { label: t("equity.win"), value: resultado.win, color: "bg-emerald-500" },
          {
            label: t("equity.tie"),
            value: resultado.tie,
            color: "bg-amber-500",
          },
          { label: t("equity.lose"), value: resultado.lose, color: "bg-red-500" },
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
        {t("equity.iterations", { n: resultado.totalIteraciones.toLocaleString() })}
      </p>
    </div>
  );
}
