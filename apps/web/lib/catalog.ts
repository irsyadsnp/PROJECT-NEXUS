import { games, type Game } from "./games";

export type { Game, GameStatus } from "./games";

/**
 * The portal depends on this catalog contract, not on a specific data source.
 * The current implementation reads the checked-in prototype catalog.
 * A future API implementation can satisfy the same asynchronous contract.
 */
export interface GameCatalogProvider {
  listGames(): Promise<readonly Game[]>;
  getGameById(id: string): Promise<Game | undefined>;
}

export const localGameCatalog: GameCatalogProvider = {
  async listGames() {
    return games;
  },

  async getGameById(id) {
    return games.find((game) => game.id === id);
  },
};

/**
 * Switch this provider only when a reachable, validated catalog API exists.
 * Until then, all pages consume the explicitly local prototype catalog.
 */
export const gameCatalog: GameCatalogProvider = localGameCatalog;
