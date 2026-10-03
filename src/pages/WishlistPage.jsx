import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { products } from '../data/mockData'
import { formatCurrency } from '../lib/utils'

export default function WishlistPage({ wishlist = [], onToggleWishlist, onAddToCart }) {
  const items = products.filter((product) => wishlist.includes(product.id))

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Saved</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Your wishlist</h1>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1.5 text-sm text-white">{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-14 text-center">
          <Heart className="mx-auto text-slate-300" size={40} />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Your wishlist is empty</h2>
          <p className="mt-2 text-slate-600">Save pieces you love and revisit them later.</p>
          <Link to="/shop"><Button className="mt-6">Browse products</Button></Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <img src={product.images[0]} alt={product.name} className="h-64 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{product.brand}</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">{product.name}</h2>
                  </div>
                  <button type="button" onClick={() => onToggleWishlist(product.id)} className="rounded-full border border-slate-200 p-2 text-slate-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-semibold text-slate-900">{formatCurrency(product.price)}</span>
                    {product.originalPrice && <span className="ml-2 text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>}
                  </div>
                  <button type="button" onClick={() => onAddToCart(product)} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm text-white">
                    <ShoppingBag size={14} /> Move to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
