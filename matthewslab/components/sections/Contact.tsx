"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AtSign, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import MagneticButton from "@/components/ui/MagneticButton"
import { socials } from "@/lib/data"

type Status = "idle" | "loading" | "success" | "error"

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Něco se pokazilo.")
      }

      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Něco se pokazilo.")
    }
  }

  return (
    <section id="kontakt" className="relative bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Kontakt"
          title="Pojďme vytvořit něco bombastického"
          description="Napište pár řádků o svém projektu a ozvu se vám do 24 hodin."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <a
              href={`mailto:${socials.email}`}
              data-cursor="hover"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-neon-blue/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-blue">
                <Mail size={18} />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">E-mail</p>
                <p className="font-display text-white">{socials.email}</p>
              </div>
            </a>

            <a
              href={socials.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-neon-purple/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-purple/10 text-neon-purple">
                <AtSign size={18} />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">Instagram</p>
                <p className="font-display text-white">{socials.instagram}</p>
              </div>
            </a>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Jméno
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-neon-blue/60"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-white/40">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-neon-blue/60"
                  placeholder="jan@firma.cz"
                />
              </div>
            </div>

            <div>
              <label htmlFor="projectType" className="font-mono text-xs uppercase tracking-widest text-white/40">
                Typ projektu
              </label>
              <select
                id="projectType"
                name="projectType"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-neon-blue/60"
              >
                <option value="" disabled>
                  Vyberte možnost
                </option>
                <option>Video / Reels</option>
                <option>Podcast</option>
                <option>Fotografie</option>
                <option>Grafický design</option>
                <option>Web design</option>
                <option>Jiné</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-white/40">
                Zpráva
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-neon-blue/60"
                placeholder="Popište mi váš projekt…"
              />
            </div>

            <MagneticButton type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Odeslat zprávu"}
            </MagneticButton>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} /> Díky! Ozvu se vám co nejdřív.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> {errorMsg}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
