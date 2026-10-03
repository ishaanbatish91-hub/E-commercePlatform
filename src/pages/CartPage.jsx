import { Minus, Plus, ShoppingBag, Sparkles, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { formatCurrency, calculateCartTotal } from '../lib/utils'

export default function CartPage({ cartItems = [], onUpdateQuantity, onRemoveItem }) {
  const totals = calculateCartTotal(cartItems)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Cart</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Your bag</h1>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1.5 text-sm text-white">{cartItems.length} items</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-16 text-center">
          <ShoppingBag className="mx-auto text-slate-300" size={52} />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Your bag is empty</h2>
          <p className="mt-2 text-slate-600">Add some standout pieces to build your next thoughtful routine.</p>
          <Link to="/shop"><Button className="mt-6">Continue shopping</Button></Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article key={`${item.id}-${item.selectedColor || 'default'}`} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
                <img src={item.images[0]} alt={item.name} className="h-32 w-full rounded-[20px] object-cover sm:w-32" />
                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.brand}</p>
                      <h2 className="mt-1 text-xl font-semibold text-slate-900">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-500">{item.selectedColor || 'Default'} • {item.selectedSize || item.sizes[0]}</p>
                    </div>
                    <button type="button" onClick={() => onRemoveItem(item.id)} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 text-slate-700"><Minus size={14} /></button>
                      <span className="min-w-8 text-center text-sm font-medium text-slate-900">{item.quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 text-slate-700"><Plus size={14} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-xs text-slate-500">{formatCurrency(item.price)} each</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(totals.shipping)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>−$0.00</span></div>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-violet-50 p-3 text-sm text-violet-700">
                <div className="mb-2 flex items-center justify-between font-medium"><span>Free shipping progress</span><span>{Math.min(100, Math.round((totals.subtotal / 300) * 100))}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-violet-100">
                  <div className="h-full rounded-full bg-violet-600" style={{ width: `${Math.min(100, Math.round((totals.subtotal / 300) * 100))}%` }} />
                </div>
              </div>
              <Link to="/checkout"><Button className="mt-6 w-full">Proceed to checkout</Button></Link>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles size={18} />
                <h3 className="text-lg font-semibold">Promo code</h3>
              </div>
              <div className="mt-4 flex gap-2">
                <input aria-label="Promo code" placeholder="NEXORA10" className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
                <Button variant="secondary" className="px-4 py-2">Apply</Button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
