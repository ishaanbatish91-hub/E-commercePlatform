import { BarChart3, DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import { BarChart, Bar, CartesianGrid, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { adminOverview } from '../data/mockData'

const statCards = [
  { label: 'Revenue', value: adminOverview.revenue, icon: DollarSign },
  { label: 'Orders', value: adminOverview.orders, icon: ShoppingCart },
  { label: 'Customers', value: adminOverview.customers, icon: Users },
  { label: 'Conversion', value: adminOverview.conversionRate, icon: TrendingUp },
]

const stats = [
  { name: 'Jan', revenue: 120 },
  { name: 'Feb', revenue: 140 },
  { name: 'Mar', revenue: 135 },
  { name: 'Apr', revenue: 170 },
  { name: 'May', revenue: 210 },
  { name: 'Jun', revenue: 180 },
  { name: 'Jul', revenue: 200 },
]

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Commerce dashboard</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <span className="rounded-full bg-slate-100 p-2 text-slate-900"><Icon size={16} /></span>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Sales overview</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Revenue trend</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent orders</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            {['NX-10482', 'NX-10415', 'NX-10394', 'NX-10370'].map((order) => (
              <div key={order} className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4">
                <span>{order}</span>
                <span className="text-slate-500">2 mins ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Top products</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            {['AeroRun Pro', 'NovaLite Watch', 'Helio Hoodie'].map((product, index) => (
              <div key={product} className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4">
                <span>{index + 1}. {product}</span>
                <span>{(240 - index * 12)} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900">
          <BarChart3 size={18} />
          <h2 className="text-xl font-semibold">Inventory alerts</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {['Meridian Chair — 5 left', 'NovaLite Watch — 9 left', 'Luma Travel Pack — 11 left'].map((item) => (
            <div key={item} className="rounded-[20px] bg-amber-50 p-4 text-sm text-amber-800">{item}</div>
          ))}
        </div>
      </div>
    </main>
  )
}
