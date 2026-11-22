import Link from "next/link";
import { gameCatalog } from "../lib/catalog";

const pillars = [
  { number: "01", title: "Discover", detail: "Find experiences across genres and dimensions." },
  { number: "02", title: "Play", detail: "Move between independent worlds with one platform identity." },
  { number: "03", title: "Create", detail: "Build, publish, and evolve games of your own." },
];

export default async function Home() {
  const experiences = await gameCatalog.listGames();

  return (
    <main>
      <header className="page-shell flex h-20 items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3" aria-label="PROJECT NEXUS home">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-sm font-black text-[#0a1007]">N</span>
          <span className="text-sm font-bold tracking-[0.18em]">PROJECT NEXUS</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] sm:flex" aria-label="Main navigation">
          <Link className="transition hover:text-white" href="/discover">Discover</Link>
          <Link className="transition hover:text-white" href="/library">My Library</Link>
          <a className="transition hover:text-white" href="#about">About</a>
          <a className="transition hover:text-white" href="https://github.com/irsyadsnp/PROJECT-NEXUS">GitHub ↗</a>
        </nav>
        <span className="rounded-full border border-[var(--accent)]/30 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--accent)]">EARLY DEVELOPMENT</span>
      </header>

      <section className="page-shell grid min-h-[570px] items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow mb-6">A UNIVERSE OF GAMES, BUILT BY EVERYONE.</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-7xl">One platform.<br /><span className="text-[var(--accent)]">Infinite worlds.</span></h1>
          <p className="muted mt-7 max-w-xl text-base leading-8 sm:text-lg">Discover independent experiences, explore new worlds, and follow the creators shaping what comes next. PROJECT NEXUS is building the foundation for a community-driven gaming universe.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/discover" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[#0a1007] transition hover:bg-[var(--accent-strong)]">Explore experiences <span aria-hidden="true">↗</span></Link>
            <a href="https://github.com/irsyadsnp/PROJECT-NEXUS" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:border-white/40">View development</a>
          </div>
          <p className="muted mt-8 text-xs">The platform is under active development. No public games are available yet.</p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute inset-8 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="panel relative aspect-square overflow-hidden p-5 sm:p-7">
            <div className="flex items-center justify-between text-[0.62rem] tracking-[0.18em] text-[var(--muted)]"><span>NEXUS / WORLD MAP</span><span>FIG. 001</span></div>
            <div className="relative mt-5 grid h-[78%] place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#0b1016]">
              <div className="absolute h-[78%] w-[78%] rounded-full border border-dashed border-white/15" />
              <div className="absolute h-[58%] w-[58%] rounded-full border border-white/10" />
              <div className="absolute h-[38%] w-[38%] rounded-full border border-[var(--accent)]/40" />
              <div className="absolute size-2 rounded-full bg-[var(--accent)] shadow-[0_0_28px_8px_rgba(163,243,107,0.45)]" />
              <div className="absolute left-[18%] top-[28%] size-2 rounded-full bg-white/80 shadow-[0_0_18px_4px_rgba(255,255,255,0.25)]" />
              <div className="absolute right-[19%] top-[42%] size-1.5 rounded-full bg-[var(--accent)]" />
              <div className="absolute bottom-[24%] left-[34%] size-1.5 rounded-full bg-[#82aaff]" />
              <div className="absolute bottom-5 left-5 text-[0.6rem] leading-5 tracking-[0.15em] text-[var(--muted)]"><div>CONNECTED WORLDS</div><div className="text-white">A NEW UNIVERSE TAKES SHAPE</div></div>
              <div className="absolute right-5 top-5 text-right text-[0.6rem] leading-5 tracking-[0.12em] text-[var(--muted)]"><div>2D / 3D</div><div>PLAYER / CREATOR</div></div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.62rem] tracking-[0.12em] text-[var(--muted)]"><span>WORLD SYSTEM: INITIALIZING</span><span className="text-[var(--accent)]">● DESIGN PHASE</span></div>
          </div>
        </div>
      </section>

      <section id="discover" className="border-y border-white/10 bg-white/[0.02] py-20">
        <div className="page-shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow mb-3">THE FIRST WORLDS</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experiences in development</h2></div>
            <span className="muted text-xs tracking-[0.12em]">CONCEPT SHOWCASE / 001—002</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((game, index) => (
              <article key={game.id} className="panel group p-6 transition hover:border-white/20 sm:p-8">
                <div className={`mb-8 flex aspect-[16/7] items-center justify-center overflow-hidden rounded-xl border border-white/10 ${game.accent === "voxel" ? "bg-[linear-gradient(135deg,#263b35,#111a1c_65%)]" : "bg-[linear-gradient(135deg,#28264d,#151322_65%)]"}`}><span className="text-5xl font-black tracking-[-0.08em] text-white/15 transition duration-500 group-hover:scale-110 sm:text-7xl">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="eyebrow">{`${game.format} ${game.genre}`.toUpperCase()}</span><span className="text-[0.6rem] tracking-[0.12em] text-[var(--muted)]">{game.stage.toUpperCase()}</span></div>
                <h3 className="mt-3 text-2xl font-semibold"><Link href={`/games/${game.id}`} className="transition hover:text-[var(--accent)]">{game.title}</Link></h3>
                <p className="muted mt-3 max-w-lg text-sm leading-7">{game.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="page-shell py-20">
        <p className="eyebrow mb-3">THE PLATFORM LOOP</p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A place to discover, play, and create.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => <article key={pillar.number} className="panel p-6"><span className="text-xs font-bold tracking-[0.16em] text-[var(--accent)]">{pillar.number}</span><h3 className="mt-8 text-xl font-semibold">{pillar.title}</h3><p className="muted mt-3 text-sm leading-7">{pillar.detail}</p></article>)}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="page-shell flex flex-col justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row"><span>© 2026 PROJECT NEXUS. A universe in progress.</span><span>BUILT FOR PLAYERS. OPEN TO CREATORS.</span></div>
      </footer>
    </main>
  );
}
