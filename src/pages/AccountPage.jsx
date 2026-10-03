import { Bell, CreditCard, MapPin, ShieldCheck, UserCircle2, Settings } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

const links = [
  { label: 'Profile', path: '/account/profile', icon: UserCircle2 },
  { label: 'Addresses', path: '/account/addresses', icon: MapPin },
  { label: 'Payment methods', path: '/account/payment-methods', icon: CreditCard },
  { label: 'Settings', path: '/account/settings', icon: Settings },
  { label: 'Security', path: '/account/security', icon: ShieldCheck },
  { label: 'Notifications', path: '/account/notifications', icon: Bell },
]

export default function AccountPage() {
  const location = useLocation()
  const activePath = location.pathname

  const renderSection = () => {
    if (activePath.startsWith('/account/addresses')) return <AddressesPanel />
    if (activePath.startsWith('/account/payment-methods')) return <PaymentPanel />
    if (activePath.startsWith('/account/settings')) return <SettingsPanel />
    if (activePath.startsWith('/account/security')) return <SecurityPanel />
    if (activePath.startsWith('/account/notifications')) return <NotificationsPanel />
    return <ProfilePanel />
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Account</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Your profile</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">AS</div>
            <div>
              <p className="font-semibold text-slate-900">Aarav Sharma</p>
              <p className="text-sm text-slate-500">Gold member</p>
            </div>
          </div>
          <nav className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon
              const isActive = activePath === item.path || (item.path === '/account/profile' && activePath === '/account')
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <section>{renderSection()}</section>
      </div>
    </main>
  )
}

function ProfilePanel() {
  return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Profile overview</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><div className="rounded-[24px] bg-slate-50 p-5"><p className="text-sm text-slate-500">Name</p><p className="mt-2 text-lg font-semibold text-slate-900">Aarav Sharma</p></div><div className="rounded-[24px] bg-slate-50 p-5"><p className="text-sm text-slate-500">Email</p><p className="mt-2 text-lg font-semibold text-slate-900">aarav@nexora.app</p></div><div className="rounded-[24px] bg-slate-50 p-5"><p className="text-sm text-slate-500">Membership</p><p className="mt-2 text-lg font-semibold text-slate-900">Gold</p></div><div className="rounded-[24px] bg-slate-50 p-5"><p className="text-sm text-slate-500">Preferred style</p><p className="mt-2 text-lg font-semibold text-slate-900">Minimal performance</p></div></div></div>
}

function AddressesPanel() { return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Saved addresses</h2><div className="mt-6 space-y-4"><div className="rounded-[24px] bg-slate-50 p-5"><p className="font-semibold text-slate-900">Home</p><p className="mt-2 text-sm text-slate-600">12 Willow Avenue, Bengaluru, 560001</p></div><div className="rounded-[24px] bg-slate-50 p-5"><p className="font-semibold text-slate-900">Office</p><p className="mt-2 text-sm text-slate-600">4th Floor, HSR Layout, Bengaluru, 560102</p></div></div></div> }

function PaymentPanel() { return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Payment methods</h2><div className="mt-6 rounded-[24px] bg-slate-50 p-5"><p className="text-sm text-slate-500">Primary card</p><p className="mt-2 text-lg font-semibold text-slate-900">Visa ending in 4827</p></div></div> }

function SettingsPanel() { return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Preferences</h2><div className="mt-6 space-y-4 text-sm text-slate-600"><div className="flex items-center justify-between rounded-[24px] bg-slate-50 p-4"><span>Marketing emails</span><span className="font-medium text-slate-900">On</span></div><div className="flex items-center justify-between rounded-[24px] bg-slate-50 p-4"><span>Regional recommendations</span><span className="font-medium text-slate-900">On</span></div></div></div> }

function SecurityPanel() { return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Security</h2><p className="mt-4 text-slate-600">Two-factor authentication is enabled for your account.</p></div> }

function NotificationsPanel() { return <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Notifications</h2><div className="mt-6 space-y-3 text-sm text-slate-600"><div className="rounded-[20px] bg-slate-50 p-4">Order updates</div><div className="rounded-[20px] bg-slate-50 p-4">Flash sale alerts</div></div></div> }
