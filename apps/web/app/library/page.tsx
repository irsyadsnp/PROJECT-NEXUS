"use client";

import Link from "next/link";
import { games } from "../../lib/games";
import { useFavorites } from "../../lib/favorites";
import { FavoriteButton } from "../../components/favorite-button";

export default function LibraryPage() {
  const { favoriteIds, ready } = useFavorites();
  const savedGames = games.filter((game) => favoriteIds.includes(game.id));

  return (
    <main className="min-h-screen">
      <header className="page-shell flex h-20 items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3" aria-label="PROJECT NEXUS home">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-sm font-black text-[#0a1007]">N</span>
          <span className="text-sm font-bold tracking-[0.18em]">PROJECT NEXUS</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--muted)] sm:gap-8" aria-label="Main navigation">
          <Link className="transition hover:text-white" href="/discover">Discover</Link>
          <Link className="text-white" href="/library" aria-current="page">My Library</Link>
          <Link className="transition hover:text-white" href="/#about">About</Link>
        </nav>
        <span className="hidden rounded-full border border-[var(--accent)]/30 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--accent)] sm:inline-flex">LOCAL LIBRARY</span>
      </header>

      <section className="page-shell pb-24 pt-16 sm:pt-24">
        <p className="eyebrow mb-4">NEXUS / YOUR COLLECTION</p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              My <span className="text-[var(--accent)]">Library.</span>
            </h1>
            <p className="muted mt-5 max-w-xl text-sm leading-7">
              Experiences you have saved on this device. This collection is stored locally and is not connected to an account.
            </p>
          </div>
          <div className="panel px-5 py-4">
            <p className="muted text-[0.62rem] tracking-[0.16em]">SAVED EXPERIENCES</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {ready ? savedGames.length.toString().padStart(2, "0") : "—"}
            </p>
          </div>
        </div>

        {!ready ? (
          <div className="panel mt-10 flex min-h-56 items-center justify-center text-sm text-[var(--muted)]" aria-live="polite">
            Loading your local library…
          </div>
        ) : savedGames.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {savedGames.map((game) => (
              <article key={game.id} className="panel overflow-hidden p-5">
                <div className={`relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-xl border border-white/10 ${game.accent === "voxel" ? "bg-[linear-gradient(135deg,#263b35,#111a1c_65%)]" : "bg-[linear-gradient(135deg,#28264d,#151322_65%)]"}`}>
                  <span className="text-7xl font-black tracking-[-0.08em] text-white/20">{game.format}</span>
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.14em]">{game.genre.toUpperCase()}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{game.stage}</p>
                    <Link href={`/games/${game.id}`} className="mt-2 inline-block text-2xl font-semibold tracking-tight transition hover:text-[var(--accent)]">{game.title}</Link>
                  </div>
                  <FavoriteButton gameId={game.id} compact />
                </div>
                <p className="muted mt-3 text-sm leading-7">{game.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[0.65rem] tracking-[0.12em] text-[var(--muted)]">NOT YET PLAYABLE</span>
                  <Link href={`/games/${game.id}`} className="text-xs font-semibold text-[var(--accent)] transition hover:text-white">VIEW DETAILS ↗</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="panel mt-10 flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <span className="text-4xl text-[var(--accent)]" aria-hidden="true">☆</span>
            <h2 className="mt-4 text-xl font-semibold">Your library is empty</h2>
            <p className="muted mt-2 max-w-md text-sm leading-6">
              Save experiences from Discover to keep them together on this device.
            </p>
            <Link href="/discover" className="mt-6 rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-bold text-[#0a1007] transition hover:bg-[var(--accent-strong)]">
              Explore experiences ↗
            </Link>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="page-shell flex flex-col justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row">
          <span>© 2026 PROJECT NEXUS. A universe in progress.</span>
          <Link href="/discover" className="transition hover:text-white">Discover more ↑</Link>
        </div>
      </footer>
    </main>
  );
}
