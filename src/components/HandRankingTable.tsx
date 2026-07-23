"use client";

import { handRankings } from "@/data/handRankings";
import { useLanguage } from "@/i18n";
import type { CardSuit, PlayingCard } from "@/types/content";

const suitSymbols: Record<CardSuit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

function CardExample({ cards }: { cards: PlayingCard[] }) {
  const { t } = useLanguage();
  const suitLabels: Record<CardSuit, string> = {
    spades: t("handRanking.suit.spades"),
    hearts: t("handRanking.suit.hearts"),
    diamonds: t("handRanking.suit.diamonds"),
    clubs: t("handRanking.suit.clubs"),
  };
  return (
    <div
      className="flex min-w-[13rem] gap-1.5"
      aria-label={cards
        .map((card) => `${card.value} de ${suitLabels[card.suit]}`)
        .join(", ")}
    >
      {cards.map((card, index) => (
        <PlayingCardView key={`${card.value}-${card.suit}-${index}`} card={card} />
      ))}
    </div>
  );
} 

function PlayingCardView({ card }: { card: PlayingCard }) {
  const isRed = card.suit === "hearts" || card.suit === "diamonds";

  return (
    <span
      className="flex h-14 w-10 shrink-0 flex-col justify-between rounded-md border border-white/20 bg-white px-1.5 py-1 text-night shadow-sm"
      aria-hidden="true"
    >
      <span className="text-sm font-bold leading-none">{card.value}</span>
      <span
        className={isRed ? "text-right text-base leading-none text-red-600" : "text-right text-base leading-none text-neutral-950"}
      >
        {suitSymbols[card.suit]}
      </span>
    </span>
  );
}

export function HandRankingTable() {
  const { t } = useLanguage();
  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-white/10 p-5">
        <h2 className="font-display text-2xl font-bold text-white">
          {t("handRanking.title")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {t("handRanking.description")}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-poker">{t("handRanking.col.rank")}</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-poker">{t("handRanking.col.hand")}</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-poker">{t("handRanking.col.example")}</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-poker">{t("handRanking.col.description")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {handRankings.map((hand) => (
              <tr key={hand.name} className="hover:bg-white/5">
                <td className="px-5 py-4 text-sm font-semibold text-gold">{hand.rank}</td>
                <td className="px-5 py-4 text-sm font-semibold text-white">{hand.name}</td>
                <td className="px-5 py-4">
                  <CardExample cards={hand.example} />
                </td>
                <td className="px-5 py-4 text-sm leading-6 text-muted">{hand.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
