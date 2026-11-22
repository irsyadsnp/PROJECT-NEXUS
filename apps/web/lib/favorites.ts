"use client";

import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "nexus:favorites:v1";
const FAVORITES_EVENT = "nexus:favorites:changed";
const EMPTY_FAVORITES: readonly string[] = [];

type FavoritesSnapshot = {
  ids: readonly string[];
  ready: boolean;
};

const SERVER_SNAPSHOT: FavoritesSnapshot = {
  ids: EMPTY_FAVORITES,
  ready: false,
};

let snapshot: FavoritesSnapshot = SERVER_SNAPSHOT;
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

function getSnapshot(): FavoritesSnapshot {
  if (!hasReadStorage && typeof window !== "undefined") {
    snapshot = { ids: readStorage(), ready: true };
    hasReadStorage = true;
  }
  return snapshot;
}

function getServerSnapshot(): FavoritesSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const onLocalChange = () => listener();
  const onStorageChange = (event: StorageEvent) => {
    if (event.key !== FAVORITES_KEY && event.key !== null) return;
    snapshot = { ids: readStorage(), ready: true };
    hasReadStorage = true;
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
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((gameId: string) => {
    if (typeof window === "undefined") return;

    const ids = getSnapshot().ids;
    const next = ids.includes(gameId)
      ? ids.filter((id) => id !== gameId)
      : [...ids, gameId];

    snapshot = { ids: next, ready: true };
    hasReadStorage = true;

    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      // Keep the current-session state if browser storage is unavailable.
    }

    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }, []);

  return {
    favoriteIds: current.ids,
    ready: current.ready,
    isFavorite: (gameId: string) => current.ids.includes(gameId),
    toggleFavorite,
  };
}
