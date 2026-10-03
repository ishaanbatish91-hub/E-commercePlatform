import { ArrowLeft, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20">
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} /> Back to login
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-slate-900">Reset your password</h1>
        <p className="mt-2 text-slate-600">Enter your email for a secure reset link.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="email" placeholder="you@email.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 outline-none" />
            </div>
          </div>
          <Button className="w-full justify-center">Send reset link</Button>
        </form>
      </div>
    </main>
  )
}
