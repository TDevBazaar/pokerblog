"use client";

import { Fragment, useMemo, useState } from "react";
import { CartaVisual } from "./CartaVisual";
import { PosicionMesa } from "./PosicionMesa";
import { PALO_A_SIMBOLO, PALO_TO_COLOR, RANGO_A_LETRA } from "./lib/mazo";
import { useLanguage } from "@/i18n";
import type { Carta, Palo, Posicion, Rango, TipoJugador } from "./lib/types";

type AsientoData = {
  numero: number;
  esJugador: boolean;
  esBB: boolean;
  posicion: Posicion;
};

type Props = {
  asientos: AsientoData[];
  comunitarias: Carta[];
  cartasJugador: Carta[];
  fase: string;
  asientoBB: number | null;
  onToggleBB: (asiento: number) => void;
  onSeleccionarCartaJugador: (carta: Carta) => void;
  onSeleccionarCartaComunidad: (carta: Carta) => void;
  tipoJugador: TipoJugador;
  onChangeTipo: (tipo: TipoJugador) => void;
  numOponentes: number;
};

const PALOS: Palo[] = ["hearts", "diamonds", "clubs", "spades"];
const RANGOS: Rango[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function posicionAsiento(
  index: number,
  total: number,
): { top: string; left: string } {
  const angulo = (index / total) * 360 + 180;
  const rad = (angulo * Math.PI) / 180;
  const radioX = 38;
  const radioY = 30;
  return {
    top: `${50 + radioY * Math.sin(rad)}%`,
    left: `${50 + radioX * Math.cos(rad)}%`,
  };
}

function MiniGrid({
  ocupadas,
  onSeleccionar,
}: {
  ocupadas: Carta[];
  onSeleccionar: (carta: Carta) => void;
}) {
  const estaOcupada = (c: Carta) =>
    ocupadas.some((x) => x.rango === c.rango && x.palo === c.palo);

  return (
    <>
      {/* Mobile: vertical layout */}
      <div
        className="grid gap-x-1 gap-y-0.5 md:hidden"
        style={{ gridTemplateColumns: "auto repeat(4, minmax(0, 1fr))" }}
      >
        <span />
        {PALOS.map((palo) => (
          <span
            key={`h-${palo}`}
            className={`flex h-9 items-center justify-center text-xs font-bold ${PALO_TO_COLOR[palo]}`}
          >
            {PALO_A_SIMBOLO[palo]}
          </span>
        ))}
        {RANGOS.map((rango) => (
          <Fragment key={rango}>
            <span className="flex h-9 items-center justify-end pr-1 text-[9px] font-bold text-muted">
              {RANGO_A_LETRA[rango]}
            </span>
            {PALOS.map((palo) => {
              const carta = { rango, palo };
              const ocupada = estaOcupada(carta);
              return (
                <button
                  key={`${palo}-${rango}`}
                  type="button"
                  disabled={ocupada}
                  onClick={() => onSeleccionar(carta)}
                  className={`flex h-9 items-center justify-center rounded text-sm font-bold transition ${
                    ocupada
                      ? "cursor-not-allowed text-white/[0.08]"
                      : "bg-white/5 text-muted hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span className={ocupada ? "" : PALO_TO_COLOR[palo]}>
                    {PALO_A_SIMBOLO[palo]}
                  </span>
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden md:block">
        <div className="mb-1 grid gap-1" style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}>
          {RANGOS.map((r) => (
            <span
              key={`l-${r}`}
              className="text-center text-[10px] font-bold text-muted"
            >
              {RANGO_A_LETRA[r]}
            </span>
          ))}
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}>
          {PALOS.map((palo) =>
            RANGOS.map((rango) => {
              const carta = { rango, palo };
              const ocupada = estaOcupada(carta);
              return (
                <button
                  key={`${palo}-${rango}`}
                  type="button"
                  disabled={ocupada}
                  onClick={() => onSeleccionar(carta)}
                  className={`flex aspect-square items-center justify-center rounded text-sm font-bold transition ${
                    ocupada
                      ? "cursor-not-allowed text-white/[0.08]"
                      : "bg-white/5 text-muted hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span className={ocupada ? "" : PALO_TO_COLOR[palo]}>
                    {PALO_A_SIMBOLO[palo]}
                  </span>
                </button>
              );
            }),
          )}
        </div>
      </div>
    </>
  );
}

export function MesaDePoker({
  asientos,
  comunitarias,
  cartasJugador,
  fase,
  onToggleBB,
  onSeleccionarCartaJugador,
  onSeleccionarCartaComunidad,
  tipoJugador,
  onChangeTipo,
  numOponentes,
}: Props) {
  const { t } = useLanguage();
  const [popupAbierto, setPopupAbierto] = useState<"jugador" | "comunidad" | null>(null);

  const todasOcupadas = useMemo(
    () => [...cartasJugador, ...comunitarias],
    [cartasJugador, comunitarias],
  );

  const mostrarJugadorPlus = (i: number) =>
    fase === "preflop" && !cartasJugador[i];

  const mostrarComPlus = (i: number) => {
    if (comunitarias[i]) return false;
    if (fase === "preflop" && cartasJugador.length < 2) return false;
    if (i < 3 && (fase === "preflop" || fase === "flop")) return true;
    if (i === 3 && fase === "turn") return true;
    if (i === 4 && fase === "river") return true;
    return false;
  };

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-3xl md:aspect-[16/9]">
      <div className="absolute inset-0 rounded-[50%] border-4 border-[#1a3a1a] bg-gradient-to-b from-[#2d5a2d] to-[#1a3a1a] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-[12%] rounded-[50%] border border-white/5 bg-[#1f4a1f]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-1 md:gap-1.5 max-md:-mt-20">
          {Array.from({ length: 5 }).map((_, i) => {
            const carta = comunitarias[i];
            if (carta) {
              return <CartaVisual key={`com-${i}`} carta={carta} className="h-12 w-9 md:h-16 md:w-12" />;
            }
            if (mostrarComPlus(i)) {
              return (
                <button
                  key={`com-plus-${i}`}
                  type="button"
                  onClick={() => setPopupAbierto("comunidad")}
                  className="flex h-12 w-9 items-center justify-center rounded border border-dashed border-poker/40 bg-poker/10 text-base font-bold text-poker transition hover:bg-poker/20 md:h-16 md:w-12 md:text-lg"
                >
                  +
                </button>   
              );
            }
            return (
              <div key={`com-${i}`} className="flex h-12 w-9 items-center justify-center rounded border border-dashed border-white/10 bg-white/[0.02] md:h-16 md:w-12" />
            );
          })}
        </div>
      </div>

      <div className="absolute left-1/2 top-[12%] flex -translate-x-1/2 items-center gap-2 md:top-[18%] md:gap-3">
        {(["preflop", "flop", "turn", "river"] as const).map((ronda, idx) => {
          const RONDAS = ["preflop", "flop", "turn", "river"];
          const idxActual = RONDAS.indexOf(fase);
          const completada = idx < idxActual;
          const actual = idx === idxActual;
          return (
            <div key={ronda} className="flex items-center gap-1 md:gap-1.5">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full transition md:h-2 md:w-2 ${
                  completada
                    ? "bg-poker"
                    : actual
                      ? "bg-poker shadow-[0_0_6px_#10b981]"
                      : "bg-white/20"
                }`}
              />
              <span
                className={`text-[7px] font-semibold uppercase tracking-wide md:text-[9px] ${
                  completada || actual ? "text-poker" : "text-white/30"
                }`}
              >
                {ronda === "preflop"
                  ? t("simulator.phase.pflopShort")
                  : ronda === "flop"
                    ? t("simulator.phase.flopShort")
                    : ronda === "turn"
                      ? t("simulator.phase.turnShort")
                      : t("simulator.phase.riverShort")}
              </span>
            </div>
          );
        })}
      </div>

      {asientos.map((asiento, i) => {
        const pos = posicionAsiento(i, asientos.length);
        const esPlayer = asiento.esJugador;
        return (
          <div
            key={`seat-${asiento.numero}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
            style={{ top: pos.top, left: pos.left }}
          >
            <button
              type="button"
              onClick={() => onToggleBB(asiento.numero)}
              className={`flex flex-col items-center gap-0.5 rounded-lg p-1.5 transition ${
                asiento.esBB
                  ? "bg-red-600/20 ring-1 ring-red-500"
                  : esPlayer
                    ? "bg-amber-600/20 ring-1 ring-amber-500"
                    : "bg-black/20 hover:bg-black/30"
              }`}
            >
              <PosicionMesa posicion={asiento.posicion} />
              <span className="text-[10px] font-bold text-white/60">
                {asiento.numero}
              </span>

              {esPlayer ? (
                <div className="flex gap-0.5">
                  {[0, 1].map((s) => {
                    if (cartasJugador[s]) {
                      return <CartaVisual key={`pc-${s}`} carta={cartasJugador[s]} className="h-12 w-9 md:h-16 md:w-12" />;
                    }
                    if (mostrarJugadorPlus(s)) {
                      return (
                        <div
                          key={`jug-plus-${s}`}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopupAbierto("jugador");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              setPopupAbierto("jugador");
                            }
                          }}
                          className="flex h-12 w-9 cursor-pointer items-center justify-center rounded border border-dashed border-poker/40 bg-poker/10 text-base font-bold text-poker transition hover:bg-poker/20 md:h-16 md:w-12 md:text-lg"
                        >
                          +
                        </div>
                      );
                    }
                    return (
                      <div
                        key={`pc-empty-${s}`}
                        className="h-10 w-7 rounded border border-dashed border-white/10 bg-white/[0.02] md:h-12 md:w-9"
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex gap-0.5">
                  <div className="h-10 w-7 rounded border border-dashed border-white/10 bg-white/[0.02] md:h-12 md:w-9" />
                  <div className="h-10 w-7 rounded border border-dashed border-white/10 bg-white/[0.02] md:h-12 md:w-9" />
                </div>
              )}

              {esPlayer && (
                <span className="text-[9px] font-bold text-amber-400">{t("simulator.youTag")}</span>
              )}
            </button>

            {esPlayer && (
              <select
                value={tipoJugador}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  onChangeTipo(e.target.value as TipoJugador)
                }
                className="mt-0.5 rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-[9px] text-white outline-none focus:border-poker"
              >
                <option value="TAG" className="bg-night text-white">{t("simulator.typeTAGShort")}</option>
                <option value="LAG" className="bg-night text-white">{t("simulator.typeLAGShort")}</option>
                <option value="TightPasivo" className="bg-night text-white">
                  {t("simulator.typeTightPShort")}
                </option>
                <option value="LoosePasivo" className="bg-night text-white">
                  {t("simulator.typeLoosePShort")}
                </option>
              </select>
            )}
          </div>
        );
      })}

      {popupAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setPopupAbierto(null)}
        >
          <div
            className="surface-card w-[95vw] max-w-3xl rounded-lg p-3 md:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-center text-sm font-semibold text-white md:mb-3 md:text-base">
              {popupAbierto === "jugador"
                ? t("simulator.popup.selectYourCard")
                : t("simulator.popup.selectCommunity")}
            </p>
            <MiniGrid
              ocupadas={todasOcupadas}
              onSeleccionar={(carta) => {
                if (popupAbierto === "jugador") {
                  onSeleccionarCartaJugador(carta);
                } else {
                  onSeleccionarCartaComunidad(carta);
                }
                setPopupAbierto(null);
              }}
            />
            <button
              type="button"
              onClick={() => setPopupAbierto(null)}
              className="mt-3 w-full text-center text-xs text-muted hover:text-white"
            >
              {t("simulator.cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
