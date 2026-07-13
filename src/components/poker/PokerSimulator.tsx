"use client";

import { useReducer, useCallback, useMemo } from "react";
import { MesaDePoker } from "./MesaDePoker";
import { PanelEquidad } from "./PanelEquidad";
import { SugerenciaAccion } from "./SugerenciaAccion";
import { simularMontecarlo } from "./lib/montecarlo";
import { sugerirAccion } from "./lib/sugerirAccion";
import type { Carta, Posicion, TipoJugador, ResultadoEquidad, Sugerencia } from "./lib/types";

type State = {
  fase: "preflop" | "flop" | "turn" | "river";
  jugador: Carta[];
  comunitarias: Carta[];
  numOponentes: number;
  asientoBB: number | null;
  tipoJugador: TipoJugador;
  posicionJugador: Posicion;
  resultado: ResultadoEquidad | null;
  sugerencia: Sugerencia | null;
  alerta: string | null;
};

type Action =
  | { type: "SET_BB"; asiento: number }
  | { type: "AGREGAR_OPONENTE" }
  | { type: "QUITAR_OPONENTE" }
  | { type: "SET_TIPO_JUGADOR"; tipo: TipoJugador }
  | { type: "SELECCIONAR_CARTA_JUGADOR"; carta: Carta }
  | { type: "SELECCIONAR_COMUNITARIA"; carta: Carta }
  | { type: "NUEVA_MANO" }
  | { type: "REINICIAR" }
  | { type: "LIMPIAR_ALERTA" };

const POSICIONES_POR_TAMANO: Record<number, Posicion[]> = {
  2: ["BB", "BTN"],
  3: ["BB", "BTN", "SB"],
  4: ["BB", "CO", "BTN", "SB"],
  5: ["BB", "MP", "CO", "BTN", "SB"],
  6: ["BB", "UTG", "MP", "CO", "BTN", "SB"],
  7: ["BB", "UTG", "MP", "MP2", "CO", "BTN", "SB"],
  8: ["BB", "UTG", "UTG+1", "MP", "MP2", "CO", "BTN", "SB"],
};

function calcularPosiciones(total: number, asientoBB: number): Posicion[] {
  const orden = POSICIONES_POR_TAMANO[total];
  const posiciones: Posicion[] = [];
  const idxBB = asientoBB - 1;
  for (let i = 0; i < total; i++) {
    posiciones[(idxBB + i) % total] = orden[i];
  }
  return posiciones;
}

function posicionJugadorCalc(
  total: number,
  asientoBB: number,
): Posicion {
  const posiciones = calcularPosiciones(total, asientoBB);
  return posiciones[0];
}

const initialState: State = {
  fase: "preflop",
  jugador: [],
  comunitarias: [],
  numOponentes: 3,
  asientoBB: 1,
  tipoJugador: "TAG",
  posicionJugador: "BB",
  resultado: null,
  sugerencia: null,
  alerta: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_BB": {
      const total = state.numOponentes + 1;
      const nuevoBB = action.asiento === state.asientoBB ? null : action.asiento;
      const posJug = nuevoBB
        ? posicionJugadorCalc(total, nuevoBB)
        : state.posicionJugador;
      return {
        ...state,
        asientoBB: nuevoBB,
        posicionJugador: posJug,
        resultado: null,
        sugerencia: null,
        alerta: null,
      };
    }

    case "AGREGAR_OPONENTE": {
      if (state.numOponentes >= 7) return state;
      return { ...state, numOponentes: state.numOponentes + 1, resultado: null, sugerencia: null };
    }

    case "QUITAR_OPONENTE": {
      if (state.numOponentes <= 1) return state;
      const nuevoTotal = state.numOponentes - 1;
      const nuevoBB = state.asientoBB && state.asientoBB <= nuevoTotal + 1
        ? state.asientoBB
        : null;
      return {
        ...state,
        numOponentes: nuevoTotal,
        asientoBB: nuevoBB,
        resultado: null,
        sugerencia: null,
      };
    }

    case "SET_TIPO_JUGADOR":
      return { ...state, tipoJugador: action.tipo };

    case "SELECCIONAR_CARTA_JUGADOR": {
      if (!state.asientoBB) {
        return { ...state, alerta: "Marca primero la ciega grande (BB) haciendo clic en un asiento de la mesa." };
      }
      if (state.jugador.length >= 2) return state;
      const yaTiene = state.jugador.some(
        (c) => c.rango === action.carta.rango && c.palo === action.carta.palo,
      );
      if (yaTiene) return state;
      const nuevas = [...state.jugador, action.carta];
      return { ...state, jugador: nuevas };
    }

    case "SELECCIONAR_COMUNITARIA": {
      if (!state.asientoBB) {
        return { ...state, alerta: "Marca primero la ciega grande (BB) haciendo clic en un asiento de la mesa." };
      }
      if (state.jugador.length < 2) {
        return { ...state, alerta: "Selecciona primero tus 2 cartas de jugador." };
      }
      if (state.comunitarias.length >= 5) return state;
      const yaTiene = state.comunitarias.some(
        (c) => c.rango === action.carta.rango && c.palo === action.carta.palo,
      );
      if (yaTiene) return state;
      const nuevas = [...state.comunitarias, action.carta];

      if (state.fase === "preflop") {
        return { ...state, comunitarias: nuevas, fase: "flop" };
      }
      if (nuevas.length === 3) {
        return { ...state, comunitarias: nuevas, fase: "turn" };
      }
      if (nuevas.length === 4) {
        return { ...state, comunitarias: nuevas, fase: "river" };
      }
      if (nuevas.length === 5) {
        return { ...state, comunitarias: nuevas };
      }
      return { ...state, comunitarias: nuevas };
    }

    case "NUEVA_MANO":
      return {
        ...state,
        fase: "preflop",
        jugador: [],
        comunitarias: [],
        resultado: null,
        sugerencia: null,
        alerta: null,
      };

    case "REINICIAR":
      return { ...initialState };

    case "LIMPIAR_ALERTA":
      return { ...state, alerta: null };

    default:
      return state;
  }
}

const FASES_LABEL: Record<string, string> = {
  preflop: "Preflop — selecciona tus 2 cartas",
  flop: "Flop — selecciona las 3 cartas comunitarias",
  turn: "Turn — selecciona 1 carta comunitaria",
  river: "River — selecciona 1 carta comunitaria",
};

export function PokerSimulator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const manejarCartaJugador = useCallback(
    (carta: Carta) => {
      dispatch({ type: "SELECCIONAR_CARTA_JUGADOR", carta });
    },
    [],
  );

  const manejarCartaComunidad = useCallback(
    (carta: Carta) => {
      dispatch({ type: "SELECCIONAR_COMUNITARIA", carta });
    },
    [],
  );

  const resultado = useMemo(() => {
    if (state.jugador.length < 2) return null;

    const equidad = simularMontecarlo(
      state.jugador,
      state.comunitarias,
      state.numOponentes,
      2000,
    );

    const sugerencia = sugerirAccion(
      equidad.win,
      state.posicionJugador,
      state.tipoJugador,
    );

    return { equidad, sugerencia };
  }, [
    state.jugador,
    state.comunitarias,
    state.numOponentes,
    state.posicionJugador,
    state.tipoJugador,
  ]);

  const asientos = useMemo(() => {
    const total = state.numOponentes + 1;
    const bb = state.asientoBB ?? 1;
    const posiciones = calcularPosiciones(total, bb);
    const result: Array<{
      numero: number;
      esJugador: boolean;
      esBB: boolean;
      posicion: Posicion;
    }> = [];

    for (let i = 1; i <= total; i++) {
      const esJugador = i === 1;
      const esBB = state.asientoBB === i;
      result.push({ numero: i, esJugador, esBB, posicion: posiciones[i - 1] });
    }

    return result;
  }, [state.numOponentes, state.asientoBB]);

  const manejarToggleBB = useCallback(
    (asiento: number) => {
      dispatch({ type: "SET_BB", asiento });
    },
    [],
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 md:gap-3 md:p-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => dispatch({ type: "QUITAR_OPONENTE" })}
              className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs font-bold text-white transition hover:bg-white/20 md:h-7 md:w-7 md:text-sm"
              title="Quitar oponente"
            >
              −
            </button>
            <span className="min-w-[4.5rem] text-center text-xs font-semibold text-white md:min-w-[5rem] md:text-sm">
              {state.numOponentes + 1} jugadores
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: "AGREGAR_OPONENTE" })}
              className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs font-bold text-white transition hover:bg-white/20 md:h-7 md:w-7 md:text-sm"
              title="Agregar oponente"
            >
              +
            </button>
          </div>
          <div className="hidden h-5 w-px bg-white/10 md:block" />
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[10px] text-muted md:text-xs">TÚ:</span>
            <select
              value={state.tipoJugador}
              onChange={(e) =>
                dispatch({
                  type: "SET_TIPO_JUGADOR",
                  tipo: e.target.value as TipoJugador,
                })
              }
              className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white outline-none focus:border-poker md:px-2 md:py-1 md:text-xs"
            >
              <option value="TAG" className="bg-night text-white">TAG</option>
              <option value="LAG" className="bg-night text-white">LAG</option>
              <option value="TightPasivo" className="bg-night text-white">Tight-Pasivo</option>
              <option value="LoosePasivo" className="bg-night text-white">Loose-Pasivo</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[10px] text-muted md:text-xs">
            BB:
            <span className="ml-1 font-semibold text-red-400">
              {state.asientoBB ? `Asiento ${state.asientoBB}` : "—"}
            </span>
          </span>
          <div className="h-5 w-px bg-white/10 md:h-6" />
          <button
            type="button"
            onClick={() => dispatch({ type: "NUEVA_MANO" })}
            className="rounded-lg bg-poker px-2 py-1 text-[10px] font-bold text-white transition hover:bg-poker/80 md:px-3 md:py-1.5 md:text-xs"
          >
            Nueva mano
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "REINICIAR" })}
            className="rounded-lg bg-white/10 px-2 py-1 text-[10px] font-semibold text-muted transition hover:bg-white/20 md:px-3 md:py-1.5 md:text-xs"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {state.alerta && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 md:p-3">
          <p className="text-xs text-amber-400 md:text-sm">{state.alerta}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: "LIMPIAR_ALERTA" })}
            className="ml-auto text-xs text-amber-400/60 hover:text-amber-400"
          >
            Cerrar
          </button>
        </div>
      )}

      <MesaDePoker
        asientos={asientos}
        comunitarias={state.comunitarias}
        cartasJugador={state.jugador}
        fase={state.fase}
        asientoBB={state.asientoBB}
        onToggleBB={manejarToggleBB}
        onSeleccionarCartaJugador={manejarCartaJugador}
        onSeleccionarCartaComunidad={manejarCartaComunidad}
        tipoJugador={state.tipoJugador}
        onChangeTipo={(tipo) => dispatch({ type: "SET_TIPO_JUGADOR", tipo })}
        numOponentes={state.numOponentes}
      />

      <div className="grid gap-4 lg:grid-cols-2 md:gap-6">
        <div>{resultado && <SugerenciaAccion sugerencia={resultado.sugerencia} />}</div>
        <div>{resultado && <PanelEquidad resultado={resultado.equidad} />}</div>
      </div>
    </div>
  );
}
