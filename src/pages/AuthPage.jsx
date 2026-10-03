import { useState } from 'react'
import { Eye, EyeOff, ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import Button from '../components/ui/Button'

export default function AuthPage({ mode = 'login' }) {
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(mode)

  const isLogin = view === 'login'

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="hidden bg-slate-900 p-10 text-white lg:block">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">Welcome back</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em]">Your next everyday upgrade is waiting.</h1>
          <p className="mt-4 max-w-md text-slate-300">Access curated essentials, saved favorites, and checkout faster than ever.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-200">
            <div className="flex items-center gap-3"><LockKeyhole size={16} />Secure member access</div>
            <div className="flex items-center gap-3"><Mail size={16} />Personalized offers</div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-8 flex gap-2 rounded-full bg-slate-100 p-1">
            <button type="button" onClick={() => setView('login')} className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${isLogin ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
              Login
            </button>
            <button type="button" onClick={() => setView('register')} className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${!isLogin ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
              Register
            </button>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900">{isLogin ? 'Welcome back' : 'Create your account'}</h2>

          <form className="mt-6 space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="Alex Morgan" />
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 pr-11 outline-none" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {isLogin && <div className="flex justify-end"><a href="/forgot-password" className="text-sm text-violet-700">Forgot password?</a></div>}

            <Button className="w-full justify-center gap-2 py-3">
              {isLogin ? 'Sign in' : 'Create account'} <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">Google</button>
            <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">Apple</button>
          </div>
        </div>
      </div>
    </main>
  )
}
