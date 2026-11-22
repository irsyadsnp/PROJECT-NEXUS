import { gameCatalog } from "../../lib/catalog";
import DiscoverClient from "./discover-client";

export default async function DiscoverPage() {
  const games = await gameCatalog.listGames();
  return <DiscoverClient games={games} />;
}
