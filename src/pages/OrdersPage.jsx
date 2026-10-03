import { useParams } from 'react-router-dom'
import { orders } from '../data/mockData'
import { formatCurrency } from '../lib/utils'

const stages = ['Ordered', 'Confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

export default function OrdersPage() {
  const { orderId } = useParams()
  const selectedOrder = orderId ? orders.find((order) => order.id === orderId) : orders[0]

  if (!selectedOrder) return <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6"><div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center">Order not found.</div></main>

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Orders</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">{orderId ? `Order ${selectedOrder.id}` : 'Order history'} </h1>
      </div>

      {!orderId ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{order.id}</p>
                  <p className="mt-1 font-semibold text-slate-900">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{order.items.length} items</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">{order.paymentStatus}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{order.deliveryStatus}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <div className="text-sm text-slate-500">Total</div>
                <div className="text-lg font-semibold text-slate-900">{formatCurrency(order.amount)}</div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="text-2xl font-semibold text-slate-900">{selectedOrder.id}</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700">{selectedOrder.paymentStatus}</div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {selectedOrder.items.map((item) => (
                <div key={item.productId} className="rounded-[24px] bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <span className="text-sm text-slate-600">Qty: {item.quantity}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">{formatCurrency(item.price)}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-500">Timeline</p>
              <div className="mt-5 space-y-4">
                {stages.map((stage, index) => (
                  <div key={stage} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= 3 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {index + 1}
                    </div>
                    <span className="text-sm text-slate-700">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
