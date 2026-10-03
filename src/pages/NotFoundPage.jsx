import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-slate-900">This page isn’t here.</h1>
      <p className="mt-4 text-lg text-slate-600">The item you’re looking for may have moved, or the link may be outdated.</p>
      <Link to="/">
        <Button className="mt-8 gap-2">
          <ArrowLeft size={16} /> Return home
        </Button>
      </Link>
    </main>
  )
}
