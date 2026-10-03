import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ cartCount = 0, wishlistCount = 0, themeMode = 'light', onToggleTheme }) {
  return (
    <div className={`min-h-screen bg-[#f7f7f3] text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <Outlet />
      <Footer />
    </div>
  )
}
