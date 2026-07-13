export type Palo = "hearts" | "diamonds" | "clubs" | "spades";
export type Rango = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Carta {
  rango: Rango;
  palo: Palo;
}

export type Fase = "config" | "preflop" | "flop" | "turn" | "river" | "resultado";

export type TipoJugador = "TAG" | "LAG" | "TightPasivo" | "LoosePasivo";

export type Posicion =
  | "UTG"
  | "UTG+1"
  | "MP"
  | "MP2"
  | "MP3"
  | "CO"
  | "BTN"
  | "SB"
  | "BB";

export type Accion = "raise" | "call" | "fold";

export interface Jugador {
  id: number;
  tipo: TipoJugador;
  posicion: Posicion;
  esJugador: boolean;
  cartas: Carta[];
}

export interface ConfiguracionMesa {
  numOponentes: number;
  oponentes: Omit<Jugador, "cartas" | "posicion">[];
  posicionJugador: Posicion;
}

export interface Sugerencia {
  accion: Accion;
  cantidad?: string;
  explicacion: string;
}

export interface ResultadoEquidad {
  win: number;
  tie: number;
  lose: number;
  totalIteraciones: number;
}

export type EstadoSimulador =
  | { fase: "config" }
  | {
      fase: Fase;
      jugador: Carta[];
      comunitarias: Carta[];
      mazoRestante: number;
      config: {
        numOponentes: number;
        posicionJugador: Posicion;
        tiposOponentes: TipoJugador[];
      };
      resultado?: {
        equidad: ResultadoEquidad;
        sugerencia: Sugerencia;
      };
    };

export type AccionSimulador =
  | {
      type: "CONFIGURAR";
      payload: {
        numOponentes: number;
        posicionBB: number;
        asientoJugador: number;
        tiposOponentes: TipoJugador[];
      };
    }
  | { type: "SELECCIONAR_CARTA_JUGADOR"; carta: Carta }
  | { type: "SELECCIONAR_COMUNITARIA"; carta: Carta }
  | { type: "NUEVA_MANO" }
  | { type: "REINICIAR" };
