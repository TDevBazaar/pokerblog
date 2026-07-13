"use client";

import { RANGO_A_LETRA, PALO_A_SIMBOLO, PALO_TO_COLOR } from "./lib/mazo";
import type { Carta, Palo, Rango } from "./lib/types";

type Props = {
  seleccionadas: Carta[];
  maxSeleccion: number;
  onSeleccionar: (carta: Carta) => void;
};

const PALOS: Palo[] = ["hearts", "diamonds", "clubs", "spades"];
const RANGOS: Rango[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function cartaEnArray(carta: Carta, arr: Carta[]): boolean {
  return arr.some((c) => c.rango === carta.rango && c.palo === carta.palo);
}

export function SelectorDeCartas({
  seleccionadas,
  maxSeleccion,
  onSeleccionar,
}: Props) {
  const completo = seleccionadas.length >= maxSeleccion;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs text-muted">
          Cartas seleccionadas: {seleccionadas.length}/{maxSeleccion}
        </p>
        {completo && (
          <p className="text-xs text-poker">Completo</p>
        )}
      </div>
      <div className="grid grid-cols-13 gap-[3px]">
        <div className="col-span-full mb-1 grid grid-cols-13 gap-[3px]">
          {RANGOS.map((r) => (
            <span
              key={`label-${r}`}
              className="text-center text-[10px] font-bold text-muted"
            >
              {RANGO_A_LETRA[r]}
            </span>
          ))}
        </div>
        {PALOS.map((palo) => (
          <div key={palo} className="contents">
            {RANGOS.map((rango) => {
              const carta: Carta = { rango, palo };
              const seleccionada = cartaEnArray(carta, seleccionadas);
              const deshabilitada = completo && !seleccionada;
              return (
                <button
                  key={`${palo}-${rango}`}
                  type="button"
                  disabled={deshabilitada}
                  onClick={() => onSeleccionar(carta)}
                  className={`flex aspect-square items-center justify-center rounded text-[11px] font-bold transition ${
                    seleccionada
                      ? "bg-poker/30 text-white ring-1 ring-poker"
                      : deshabilitada
                        ? "cursor-not-allowed text-white/10"
                        : "bg-white/5 text-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={seleccionada ? "text-white" : PALO_TO_COLOR[palo]}>
                    {PALO_A_SIMBOLO[palo]}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
