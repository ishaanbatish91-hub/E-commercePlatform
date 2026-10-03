import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 size={42} />
      </div>
      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Order placed successfully</h1>
      <p className="mt-3 text-lg text-slate-600">Your order is confirmed and an email confirmation is on the way.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/orders"><Button>View order</Button></Link>
        <Link to="/shop"><Button variant="secondary">Continue shopping</Button></Link>
      </div>
    </main>
  )
}
