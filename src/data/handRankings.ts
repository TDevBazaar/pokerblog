import type { HandRanking } from "@/types/content";

export const handRankings: HandRanking[] = [
  {
    rank: 1,
    name: "Escalera real",
    example: [
      { value: "A", suit: "spades" },
      { value: "K", suit: "spades" },
      { value: "Q", suit: "spades" },
      { value: "J", suit: "spades" },
      { value: "10", suit: "spades" },
    ],
    description: "La mano mas alta posible. Es una escalera de color al as.",
  },
  {
    rank: 2,
    name: "Escalera de color",
    example: [
      { value: "9", suit: "hearts" },
      { value: "8", suit: "hearts" },
      { value: "7", suit: "hearts" },
      { value: "6", suit: "hearts" },
      { value: "5", suit: "hearts" },
    ],
    description: "Cinco cartas consecutivas del mismo palo.",
  },
  {
    rank: 3,
    name: "Póker",
    example: [
      { value: "Q", suit: "spades" },
      { value: "Q", suit: "hearts" },
      { value: "Q", suit: "diamonds" },
      { value: "Q", suit: "clubs" },
      { value: "4", suit: "spades" },
    ],
    description: "Cuatro cartas del mismo valor.",
  },
  {
    rank: 4,
    name: "Full house",
    example: [
      { value: "J", suit: "spades" },
      { value: "J", suit: "hearts" },
      { value: "J", suit: "diamonds" },
      { value: "7", suit: "clubs" },
      { value: "7", suit: "spades" },
    ],
    description: "Un trio combinado con una pareja.",
  },
  {
    rank: 5,
    name: "Color",
    example: [
      { value: "A", suit: "diamonds" },
      { value: "J", suit: "diamonds" },
      { value: "8", suit: "diamonds" },
      { value: "5", suit: "diamonds" },
      { value: "2", suit: "diamonds" },
    ],
    description: "Cinco cartas del mismo palo, sin ser consecutivas.",
  },
  {
    rank: 6,
    name: "Escalera",
    example: [
      { value: "10", suit: "spades" },
      { value: "9", suit: "hearts" },
      { value: "8", suit: "clubs" },
      { value: "7", suit: "diamonds" },
      { value: "6", suit: "spades" },
    ],
    description: "Cinco cartas consecutivas de palos distintos.",
  },
  {
    rank: 7,
    name: "Trio",
    example: [
      { value: "8", suit: "spades" },
      { value: "8", suit: "hearts" },
      { value: "8", suit: "diamonds" },
      { value: "K", suit: "clubs" },
      { value: "3", suit: "spades" },
    ],
    description: "Tres cartas del mismo valor.",
  },
  {
    rank: 8,
    name: "Doble pareja",
    example: [
      { value: "A", suit: "spades" },
      { value: "A", suit: "hearts" },
      { value: "6", suit: "clubs" },
      { value: "6", suit: "diamonds" },
      { value: "9", suit: "spades" },
    ],
    description: "Dos pares distintos y una carta adicional.",
  },
  {
    rank: 9,
    name: "Pareja",
    example: [
      { value: "K", suit: "spades" },
      { value: "K", suit: "diamonds" },
      { value: "10", suit: "clubs" },
      { value: "7", suit: "hearts" },
      { value: "2", suit: "spades" },
    ],
    description: "Dos cartas del mismo valor.",
  },
  {
    rank: 10,
    name: "Carta alta",
    example: [
      { value: "A", suit: "spades" },
      { value: "Q", suit: "diamonds" },
      { value: "9", suit: "clubs" },
      { value: "6", suit: "hearts" },
      { value: "3", suit: "spades" },
    ],
    description: "Cuando no hay combinacion, gana la carta mas alta.",
  },
];
