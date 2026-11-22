"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { games } from "../../lib/games";

const genres = ["All genres", "Sandbox", "Platformer"] as const;
const formats = ["All formats", "2D", "3D"] as const;

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<(typeof genres)[number]>("All genres");
  const [format, setFormat] = useState<(typeof formats)[number]>("All formats");

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return games.filter((game) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [game.title, game.genre, game.description, ...game.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesGenre = genre === "All genres" || game.genre === genre;
      const matchesFormat = format === "All formats" || game.format === format;

      return matchesQuery && matchesGenre && matchesFormat;
    });
  }, [genre, format, query]);

  const hasActiveFilters =
    query.length > 0 || genre !== "All genres" || format !== "All formats";

  function resetFilters() {
    setQuery("");
    setGenre("All genres");
    setFormat("All formats");
  }

  return (
    <main className="min-h-screen">
      <header className="page-shell flex h-20 items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3" aria-label="PROJECT NEXUS home">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-sm font-black text-[#0a1007]">N</span>
          <span className="text-sm font-bold tracking-[0.18em]">PROJECT NEXUS</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--muted)] sm:gap-8" aria-label="Main navigation">
          <Link className="text-white" href="/discover" aria-current="page">Discover</Link>
          <Link className="transition hover:text-white" href="/#about">About</Link>
          <a className="transition hover:text-white" href="https://github.com/irsyadsnp/PROJECT-NEXUS">GitHub ↗</a>
        </nav>
        <span className="hidden rounded-full border border-[var(--accent)]/30 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--accent)] sm:inline-flex">EARLY DEVELOPMENT</span>
      </header>

      <section className="page-shell pb-12 pt-16 sm:pb-16 sm:pt-24">
        <p className="eyebrow mb-4">NEXUS / DISCOVERY</p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl">
              Find your next <span className="text-[var(--accent)]">world.</span>
            </h1>
            <p className="muted mt-5 max-w-2xl text-sm leading-7 sm:text-base">
              Explore independent experiences being developed for the NEXUS universe.
              Every listing here is a prototype concept, not a released game.
            </p>
          </div>
          <div className="panel px-5 py-4">
            <p className="muted text-[0.62rem] tracking-[0.16em]">CURRENT CATALOG</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{games.length.toString().padStart(2, "0")} <span className="muted text-sm font-normal">concepts</span></p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-24" aria-label="Game catalog">
        <div className="panel mb-8 grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(240px,1fr)_auto_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-wide text-[var(--muted)]">SEARCH EXPERIENCES</span>
            <span className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[var(--accent)]/60">
              <span aria-hidden="true" className="text-[var(--muted)]">⌕</span>
              <input
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                type="search"
                placeholder="Search games, genres, or tags..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-wide text-[var(--muted)]">GENRE</span>
            <select
              className="h-12 min-w-40 rounded-xl border border-white/10 bg-[#111722] px-4 text-sm text-white outline-none focus:border-[var(--accent)]/60"
              value={genre}
              onChange={(event) => setGenre(event.target.value as (typeof genres)[number])}
            >
              {genres.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-wide text-[var(--muted)]">GAME FORMAT</span>
            <select
              className="h-12 min-w-40 rounded-xl border border-white/10 bg-[#111722] px-4 text-sm text-white outline-none focus:border-[var(--accent)]/60"
              value={format}
              onChange={(event) => setFormat(event.target.value as (typeof formats)[number])}
            >
              {formats.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="muted text-xs tracking-[0.12em]">
            SHOWING <span className="font-semibold text-white">{filteredGames.length.toString().padStart(2, "0")}</span> OF {games.length.toString().padStart(2, "0")} EXPERIENCES
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[var(--accent)] transition hover:text-white"
            >
              Reset filters ×
            </button>
          )}
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredGames.map((game, index) => (
              <article key={game.id} className="panel group overflow-hidden p-4 sm:p-5">
                <div className={`relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-xl border border-white/10 ${game.accent === "voxel" ? "bg-[linear-gradient(135deg,#263b35,#111a1c_65%)]" : "bg-[linear-gradient(135deg,#28264d,#151322_65%)]"}`}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                  <span className="relative text-7xl font-black tracking-[-0.08em] text-white/20 transition duration-500 group-hover:scale-110">{String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-white/80">{game.format} EXPERIENCE</span>
                  <span className="absolute bottom-4 right-4 rounded-full border border-[var(--accent)]/30 bg-black/40 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-[var(--accent)]">CONCEPT</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
                  <span className="eyebrow">{game.genre}</span>
                  <span className="muted text-[0.65rem] uppercase tracking-[0.1em]">{game.stage}</span>
                </div>
                <Link href={`/games/${game.id}`} className="mt-3 inline-block text-2xl font-semibold tracking-tight transition hover:text-[var(--accent)]">{game.title}</Link>
                <p className="muted mt-3 min-h-14 text-sm leading-7">{game.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[0.65rem] text-[var(--muted)]">{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[0.65rem] tracking-[0.12em] text-[var(--muted)]">NOT YET PLAYABLE</span>
                  <Link href={`/games/${game.id}`} className="text-xs font-semibold text-[var(--accent)] transition hover:text-white">VIEW DETAILS ↗</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="panel flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <span className="text-3xl text-[var(--muted)]" aria-hidden="true">⌕</span>
            <h2 className="mt-4 text-xl font-semibold">No experiences found</h2>
            <p className="muted mt-2 max-w-md text-sm leading-6">Try another search term or clear your filters to see all current concepts.</p>
            <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[#0a1007] transition hover:bg-[var(--accent-strong)]">Clear filters</button>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="page-shell flex flex-col justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row">
          <span>© 2026 PROJECT NEXUS. A universe in progress.</span>
          <Link href="/" className="transition hover:text-white">Back to home ↑</Link>
        </div>
      </footer>
    </main>
  );
}
