import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center shadow-lg dark:bg-inverse-primary">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Ready to digitize your institution?
        </h2>
        <p className="mb-8 text-base text-white/80">
          Join the elite circle of universities future-proofing their institutional
          knowledge with Archiva.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="secondary"
            className="h-11 p-6 text-base bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link to="/login">Get Started with Microsoft</Link>
          </Button>
          <Button
            variant="outline"
            className="h-11 p-6 text-base bg-transparent dark:bg-transparent border-white/20 dark:border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link to="/login">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
