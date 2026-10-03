import { Menu, Search, ShoppingBag, User, Heart, Sparkles, MoonStar, SunMedium } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Categories', path: '/shop' },
  { label: 'Account', path: '/account' },
]

export default function Navbar({ cartCount = 0, wishlistCount = 0, themeMode = 'light', onToggleTheme }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    const query = search.trim()
    if (!query) return navigate('/shop')
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setSearch('')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium tracking-[0.18em] text-slate-200 uppercase">
        Free shipping over $300 • New arrivals every Friday
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:hidden" aria-label="Open menu">
            <Menu size={18} />
          </button>
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-violet-500">
              <Sparkles size={16} />
            </span>
            NEXORA
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path + item.label}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-slate-950 dark:text-white' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <form onSubmit={handleSearch} className="hidden flex-1 items-center justify-center px-4 lg:flex">
          <label className="flex w-full max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full border-none bg-transparent text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="Search products, brands, styles"
              aria-label="Search products"
            />
          </label>
        </form>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeMode === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            title={themeMode === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {themeMode === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          <Link to="/wishlist" className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" aria-label="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" aria-label="Shopping cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white dark:bg-violet-500">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hidden rounded-full bg-slate-900 p-2 text-white dark:bg-violet-500 sm:inline-flex" aria-label="Account login">
            <User size={18} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
