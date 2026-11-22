import { gameCatalog } from "../../lib/catalog";
import LibraryClient from "./library-client";

export default async function LibraryPage() {
  const games = await gameCatalog.listGames();
  return <LibraryClient games={games} />;
}
