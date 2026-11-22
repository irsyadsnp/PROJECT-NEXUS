"use client";

import { useFavorites } from "../lib/favorites";

type FavoriteButtonProps = {
  gameId: string;
  compact?: boolean;
};

export function FavoriteButton({
  gameId,
  compact = false,
}: FavoriteButtonProps) {
  const { isFavorite, ready, toggleFavorite } = useFavorites();
  const favorite = isFavorite(gameId);

  return (
    <button
      type="button"
      disabled={!ready}
      aria-pressed={favorite}
      aria-label={favorite ? "Remove from My Library" : "Save to My Library"}
      title={favorite ? "Remove from My Library" : "Save to My Library"}
      onClick={() => toggleFavorite(gameId)}
      className={
        compact
          ? "inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-lg text-[var(--accent)] transition hover:border-[var(--accent)] disabled:opacity-50"
          : "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
      }
    >
      <span aria-hidden="true">{favorite ? "★" : "☆"}</span>
      {!compact && (favorite ? "Saved to library" : "Save to library")}
    </button>
  );
}
