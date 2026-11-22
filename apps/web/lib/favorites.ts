"use client";

import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "nexus:favorites:v1";
const FAVORITES_EVENT = "nexus:favorites:changed";
const EMPTY_FAVORITES: readonly string[] = [];

let favoriteIds: readonly string[] = EMPTY_FAVORITES;
let hasReadStorage = false;

function readStorage(): readonly string[] {
  if (typeof window === "undefined") return EMPTY_FAVORITES;

  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem(FAVORITES_KEY) ?? "[]",
    );
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : EMPTY_FAVORITES;
  } catch {
    return EMPTY_FAVORITES;
  }
}

function getSnapshot(): readonly string[] {
  if (!hasReadStorage && typeof window !== "undefined") {
    favoriteIds = readStorage();
    hasReadStorage = true;
  }
  return favoriteIds;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY_FAVORITES;
}

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const onLocalChange = () => listener();
  const onStorageChange = (event: StorageEvent) => {
    if (event.key !== FAVORITES_KEY && event.key !== null) return;
    favoriteIds = readStorage();
    listener();
  };

  window.addEventListener(FAVORITES_EVENT, onLocalChange);
  window.addEventListener("storage", onStorageChange);

  return () => {
    window.removeEventListener(FAVORITES_EVENT, onLocalChange);
    window.removeEventListener("storage", onStorageChange);
  };
}

export function useFavorites() {
  const favoriteIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((gameId: string) => {
    if (typeof window === "undefined") return;

    const current = getSnapshot();
    const next = current.includes(gameId)
      ? current.filter((id) => id !== gameId)
      : [...current, gameId];

    favoriteIds = next;
    hasReadStorage = true;

    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      // Keep the current-session state if browser storage is unavailable.
    }

    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }, []);

  return {
    favoriteIds,
    ready: typeof window !== "undefined" && hasReadStorage,
    isFavorite: (gameId: string) => favoriteIds.includes(gameId),
    toggleFavorite,
  };
}
