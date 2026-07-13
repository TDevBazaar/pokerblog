import type { Carta, Palo } from "./types";

type Combinacion = {
  tipo: number;
  rango: number;
};

function combinaciones5(cartas: Carta[]): Carta[][] {
  const result: Carta[][] = [];
  for (let a = 0; a < cartas.length; a++) {
    for (let b = a + 1; b < cartas.length; b++) {
      for (let c = b + 1; c < cartas.length; c++) {
        for (let d = c + 1; d < cartas.length; d++) {
          for (let e = d + 1; e < cartas.length; e++) {
            result.push([
              cartas[a],
              cartas[b],
              cartas[c],
              cartas[d],
              cartas[e],
            ]);
          }
        }
      }
    }
  }
  return result;
}

function evaluar5(cartas: Carta[]): Combinacion {
  const rangos = cartas.map((c) => c.rango).sort((a, b) => b - a);
  const palos = cartas.map((c) => c.palo);

  const esColor = palos.every((p) => p === palos[0]);

  const rangosUnicos = [...new Set(rangos)].sort((a, b) => b - a);

  const repes: [number, number][] = [];
  for (const r of rangosUnicos) {
    const count = rangos.filter((x) => x === r).length;
    if (count > 1) repes.push([r, count]);
  }
  repes.sort((a, b) => b[1] - a[1] || b[0] - a[0]);

  const esEscalera = (() => {
    const r = [...new Set(rangos)].sort((a, b) => b - a);
    if (r.length < 5) return false;
    if (r[0] - r[4] === 4) return true;
    if (r[0] === 14 && r[1] === 5 && r[2] === 4 && r[3] === 3 && r[4] === 2)
      return true;
    return false;
  })();

  if (esEscalera && esColor) {
    const esBroadway = rangos.includes(14) && rangos.includes(13);
    return { tipo: 10, rango: esBroadway ? 14 : rangos[0] };
  }

  if (repes.length === 1 && repes[0][1] === 4) {
    return { tipo: 8, rango: repes[0][0] };
  }

  if (repes.length === 2 && repes[0][1] === 3 && repes[1][1] === 2) {
    return { tipo: 7, rango: repes[0][0] };
  }

  if (esColor) {
    return { tipo: 6, rango: rangos[0] };
  }

  if (esEscalera) {
    return { tipo: 5, rango: rangos[0] };
  }

  if (repes.length > 0 && repes[0][1] === 3) {
    return { tipo: 4, rango: repes[0][0] };
  }

  if (repes.length >= 2 && repes[0][1] === 2 && repes[1][1] === 2) {
    return { tipo: 3, rango: repes[0][0] };
  }

  if (repes.length >= 1 && repes[0][1] === 2) {
    return { tipo: 2, rango: repes[0][0] };
  }

  return { tipo: 1, rango: rangos[0] };
}

export function mejorCombinacion(cartas: Carta[]): Combinacion {
  if (cartas.length < 5) {
    return { tipo: 0, rango: 0 };
  }
  const combos = combinaciones5(cartas);
  let mejor: Combinacion = { tipo: 0, rango: 0 };
  for (const c of combos) {
    const ev = evaluar5(c);
    if (
      ev.tipo > mejor.tipo ||
      (ev.tipo === mejor.tipo && ev.rango > mejor.rango)
    ) {
      mejor = ev;
    }
  }
  return mejor;
}

export function compararManos(a: Combinacion, b: Combinacion): number {
  if (a.tipo !== b.tipo) return a.tipo - b.tipo;
  return a.rango - b.rango;
}

export const NOMBRES_MANOS: Record<number, string> = {
  10: "Escalera real",
  9: "Escalera de color",
  8: "Póker",
  7: "Full house",
  6: "Color",
  5: "Escalera",
  4: "Trío",
  3: "Doble pareja",
  2: "Pareja",
  1: "Carta alta",
};
