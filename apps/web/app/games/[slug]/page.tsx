import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameBySlug, games } from "../../../lib/games";
import { FavoriteButton } from "../../../components/favorite-button";

type GameDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.id }));
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) notFound();

  const isPlayable = game.status === "published";

  return (
    <main className="min-h-screen">
      <header className="page-shell flex h-20 items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3" aria-label="PROJECT NEXUS home">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-sm font-black text-[#0a1007]">N</span>
          <span className="text-sm font-bold tracking-[0.18em]">PROJECT NEXUS</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--muted)] sm:gap-8" aria-label="Main navigation">
          <Link className="text-white" href="/discover">Discover</Link>
          <Link className="transition hover:text-white" href="/library">My Library</Link>
          <Link className="transition hover:text-white" href="/#about">About</Link>
          <a className="transition hover:text-white" href="https://github.com/irsyadsnp/PROJECT-NEXUS">GitHub ↗</a>
        </nav>
        <span className="hidden rounded-full border border-[var(--accent)]/30 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--accent)] sm:inline-flex">EARLY DEVELOPMENT</span>
      </header>

      <section className="page-shell pb-20 pt-10 sm:pt-16">
        <Link href="/discover" className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] transition hover:text-white">← BACK TO DISCOVER</Link>

        <div className={`relative mt-8 flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/10 sm:min-h-96 ${game.accent === "voxel" ? "bg-[linear-gradient(135deg,#263b35,#111a1c_65%)]" : "bg-[linear-gradient(135deg,#28264d,#151322_65%)]"}`}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          <span className="relative text-8xl font-black tracking-[-0.1em] text-white/20 sm:text-[10rem]">{game.format}</span>
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.15em]">{game.genre.toUpperCase()}</span>
          <span className="absolute bottom-5 right-5 rounded-full border border-[var(--accent)]/30 bg-black/40 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--accent)]">{game.stage.toUpperCase()}</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="eyebrow">NEXUS / GAME PROFILE</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{game.title}</h1>
            <p className="muted mt-6 max-w-3xl text-base leading-8">{game.longDescription}</p>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Experience overview</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {game.features.map((feature) => (
                  <li key={feature} className="panel flex items-start gap-3 p-4 text-sm leading-6">
                    <span className="mt-0.5 text-[var(--accent)]">↗</span>{feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {game.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-4 py-2 text-xs text-[var(--muted)]">{tag}</span>)}
              </div>
            </div>
          </div>

          <aside className="panel h-fit p-6">
            <p className="muted text-[0.65rem] font-semibold tracking-[0.16em]">GAME INFORMATION</p>
            <dl className="mt-5 space-y-5 text-sm">
              <div><dt className="muted text-xs">Developer</dt><dd className="mt-1 font-medium">{game.developer}</dd></div>
              <div><dt className="muted text-xs">Genre</dt><dd className="mt-1 font-medium">{game.genre}</dd></div>
              <div><dt className="muted text-xs">Format</dt><dd className="mt-1 font-medium">{game.format}</dd></div>
              <div><dt className="muted text-xs">Release status</dt><dd className="mt-1 font-medium capitalize">{game.status}</dd></div>
              <div>
                <dt className="muted text-xs">Planned platforms</dt>
                <dd className="mt-2 space-y-2">{game.supportedPlatforms.map((platform) => <div key={platform} className="rounded-lg border border-white/10 px-3 py-2 text-xs">{platform}</div>)}</dd>
              </div>
            </dl>
            <div className="mt-7"><FavoriteButton gameId={game.id} /></div>
            <button type="button" disabled={!isPlayable} className="mt-4 w-full cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/35 disabled:opacity-100" title="This experience has no published build yet">
              {isPlayable ? "Play now" : "Not yet playable"}
            </button>
            <p className="muted mt-3 text-center text-[0.65rem] leading-5">{isPlayable ? "A compatible game build is available." : "The game has no published build. The Play action is disabled."}</p>
          </aside>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="page-shell flex flex-col justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row">
          <span>© 2026 PROJECT NEXUS. A universe in progress.</span>
          <Link href="/discover" className="transition hover:text-white">Explore more experiences ↑</Link>
        </div>
      </footer>
    </main>
  );
}
