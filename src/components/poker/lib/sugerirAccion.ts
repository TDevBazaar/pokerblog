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
      cantidad: equity > 65 ? "2/3 del bote" : "1/2 del bote",
      explicacion: tardia
        ? "Mano fuerte desde posición tardía. Sube para construir el bote."
        : "Mano dominante. Sube fuerte desde esta posición.",
    };
  }

  if (equity > umbral.call) {
    if (tardia) {
      return {
        accion: tardia && equity > umbral.raise - 10 ? "raise" : "call",
        cantidad: "1/3 del bote",
        explicacion: "Equidad suficiente desde posición tardía. Juega la mano.",
      };
    }
    return {
      accion: "call",
      explicacion:
        "Equidad moderada. Iguala y evalúa en la siguiente calle.",
    };
  }

  if (equity > 15 && tardia) {
    return {
      accion: "call",
      explicacion:
        "Equidad baja pero desde posición tardía puedes igualar si no hay subida grande.",
    };
  }

  return {
    accion: "fold",
    explicacion:
      "Equidad muy baja. No vale la pena continuar con esta mano.",
  };
}
