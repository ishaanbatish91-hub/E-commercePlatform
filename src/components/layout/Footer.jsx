import { Globe, MessageCircle, Send, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Shop: ['New arrivals', 'Best sellers', 'Gift cards', 'Sale'],
  Support: ['Shipping', 'Returns', 'Careers', 'Help center'],
  Company: ['About', 'Journal', 'Sustainability', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-900">N</span>
            NEXORA
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-400">
            Discover better. Shop smarter. Premium essentials curated for modern living.
          </p>
          <div className="mt-6 flex gap-3 text-slate-300">
            <a href="https://instagram.com" className="rounded-full border border-slate-700 p-2 transition hover:border-slate-500" aria-label="Instagram"><Globe size={16} /></a>
            <a href="https://facebook.com" className="rounded-full border border-slate-700 p-2 transition hover:border-slate-500" aria-label="Facebook"><MessageCircle size={16} /></a>
            <a href="https://twitter.com" className="rounded-full border border-slate-700 p-2 transition hover:border-slate-500" aria-label="Twitter"><Send size={16} /></a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">{heading}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {links.map((link) => (
                <li key={link}><Link to="/shop" className="transition hover:text-white">{link}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>© 2026 NEXORA. All rights reserved.</p>
          <div className="flex items-center gap-2 text-white">
            <span>Join the list</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-slate-900">
              Early access <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
