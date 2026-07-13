import type { Carta, Palo, Rango } from "./types";

const PALOS: Palo[] = ["hearts", "diamonds", "clubs", "spades"];
const RANGOS: Rango[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export function crearMazo(): Carta[] {
  const mazo: Carta[] = [];
  for (const palo of PALOS) {
    for (const rango of RANGOS) {
      mazo.push({ rango, palo });
    }
  }
  return mazo;
}

export function barajar(mazo: Carta[]): Carta[] {
  const copia = [...mazo];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function extraerCartas(mazo: Carta[], cartas: Carta[]): Carta[] {
  const indices = cartas.map((c) =>
    mazo.findIndex(
      (m) => m.rango === c.rango && m.palo === c.palo,
    ),
  );
  return mazo.filter((_, i) => !indices.includes(i));
}

export const RANGO_A_LETRA: Record<Rango, string> = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};

export const PALO_A_SIMBOLO: Record<Palo, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export const PALO_TO_COLOR: Record<Palo, string> = {
  hearts: "text-red-500",
  diamonds: "text-red-500",
  clubs: "text-gray-100",
  spades: "text-gray-100",
};
