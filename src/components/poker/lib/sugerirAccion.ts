import type { Posicion, TipoJugador, Sugerencia } from "./types";

const ORDEN_TARDIA = ["BB", "UTG", "UTG+1", "MP", "MP2", "CO", "BTN", "SB"];

function esTardia(pos: string): boolean {
  const idx = ORDEN_TARDIA.indexOf(pos);
  return idx >= 5;
}

const UMBRALES: Record<TipoJugador, { raise: number; call: number }> = {
  TAG: { raise: 50, call: 30 },
  LAG: { raise: 40, call: 20 },
  TightPasivo: { raise: 60, call: 25 },
  LoosePasivo: { raise: 65, call: 15 },
};

export function sugerirAccion(
  equity: number,
  posicion: Posicion,
  tipoJugador: TipoJugador,
): Sugerencia {
  const umbral = UMBRALES[tipoJugador];
  const tardia = esTardia(posicion);

  if (equity > umbral.raise) {
    return {
      accion: "raise",
      cantidad: equity > 65 ? "2/3 pot" : "1/2 pot",
      explicacion: tardia
        ? "Strong hand from late position. Raise to build the pot."
        : "Dominant hand. Raise strongly from this position.",
    };
  }

  if (equity > umbral.call) {
    if (tardia) {
      return {
        accion: tardia && equity > umbral.raise - 10 ? "raise" : "call",
        cantidad: "1/3 pot",
        explicacion: "Enough equity from late position. Play the hand.",
      };
    }
    return {
      accion: "call",
      explicacion:
        "Moderate equity. Call and evaluate on the next street.",
    };
  }

  if (equity > 15 && tardia) {
    return {
      accion: "call",
      explicacion:
        "Low equity but from late position you can call if there's no big raise.",
    };
  }

  return {
    accion: "fold",
    explicacion:
      "Very low equity. Not worth continuing with this hand.",
  };
}
