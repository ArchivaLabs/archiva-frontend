import { Archive } from "lucide-react"

export default function Logo() {
  return (
    <article className="relative z-10 flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
        <Archive className="size-5 text-white" />
      </div>
      <span className="text-base font-bold text-white">Archiva</span>
    </article>
  )
}
