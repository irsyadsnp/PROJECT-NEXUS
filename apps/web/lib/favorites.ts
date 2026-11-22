"use client";

import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "nexus:favorites:v1";
const FAVORITES_EVENT = "nexus:favorites:changed";

function readFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem(FAVORITES_KEY) ?? "[]",
    );
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(readFavoriteIds());

    syncFavorites();
    setReady(true);
    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

  const toggleFavorite = useCallback((gameId: string) => {
    const current = readFavoriteIds();
    const next = current.includes(gameId)
      ? current.filter((id) => id !== gameId)
      : [...current, gameId];

    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      setFavoriteIds(next);
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    } catch {
      // Private browsing or storage restrictions can prevent persistence.
      setFavoriteIds(current);
    }
  }, []);

  return {
    favoriteIds,
    ready,
    isFavorite: (gameId: string) => favoriteIds.includes(gameId),
    toggleFavorite,
  };
}
