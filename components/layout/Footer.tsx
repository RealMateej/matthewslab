import { AtSign, Mail, ArrowUp } from "lucide-react"
import { navLinks, socials } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold text-white">
            Matthews<span className="text-neon-blue">Lab</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Kreativní studio pro video, foto, design a web. Obsah a weby, které
            vypadají draze.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Navigace
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${socials.email}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
                >
                  <Mail size={15} /> {socials.email}
                </a>
              </li>
              <li>
                <a
                  href={socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
                >
                  <AtSign size={15} /> {socials.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <a
          href="#top"
          className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-neon-blue hover:text-white"
          aria-label="Zpět nahoru"
        >
          <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-6 text-xs text-white/30">
        © {new Date().getFullYear()} MatthewsLab. Všechna práva vyhrazena.
      </div>
    </footer>
  )
}
