import type { Carta, Jugador, ResultadoEquidad } from "./types";
import { crearMazo, extraerCartas, barajar } from "./mazo";
import { mejorCombinacion, compararManos } from "./evaluador";

const ITERACIONES_POR_DEFECTO = 2000;

function repartirAleatorio(
  mazoRestante: Carta[],
  numOponentes: number,
  numComunitariasFuturas: number,
) {
  const barajado = barajar(mazoRestante);
  let idx = 0;
  const manos: Carta[][] = [];
  for (let i = 0; i < numOponentes; i++) {
    manos.push([barajado[idx++], barajado[idx++]]);
  }
  const comunitarias: Carta[] = [];
  for (let i = 0; i < numComunitariasFuturas; i++) {
    comunitarias.push(barajado[idx++]);
  }
  return { manos, comunitarias };
}

export function simularMontecarlo(
  cartasJugador: Carta[],
  comunitarias: Carta[],
  numOponentes: number,
  iteraciones: number = ITERACIONES_POR_DEFECTO,
): ResultadoEquidad {
  const mazoCompleto = crearMazo();
  const cartasConocidas = [...cartasJugador, ...comunitarias];
  const mazoRestante = extraerCartas(mazoCompleto, cartasConocidas);
  const numComunitariasFuturas = 5 - comunitarias.length;

  let win = 0;
  let tie = 0;
  let lose = 0;
  const manosJugador = [...comunitarias, ...cartasJugador];

  for (let i = 0; i < iteraciones; i++) {
    const { manos, comunitarias: futuras } = repartirAleatorio(
      mazoRestante,
      numOponentes,
      numComunitariasFuturas,
    );

    const todasComunitarias = [...comunitarias, ...futuras];
    const manoJugadorCompleta = [...todasComunitarias, ...cartasJugador];
    const mejorJugador = mejorCombinacion(manoJugadorCompleta);

    let ganaJugador = true;
    let empata = false;

    for (const manoOponente of manos) {
      const manoOponenteCompleta = [...todasComunitarias, ...manoOponente];
      const mejorOponente = mejorCombinacion(manoOponenteCompleta);
      const cmp = compararManos(mejorJugador, mejorOponente);

      if (cmp < 0) {
        ganaJugador = false;
        break;
      }
      if (cmp === 0) {
        empata = true;
      }
    }

    if (ganaJugador && !empata) win++;
    else if (ganaJugador && empata) tie++;
    else lose++;
  }

  return {
    win: Math.round((win / iteraciones) * 100),
    tie: Math.round((tie / iteraciones) * 100),
    lose: Math.round((lose / iteraciones) * 100),
    totalIteraciones: iteraciones,
  };
}
