import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/utils'

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-900 shadow-sm">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
          aria-label={`Toggle wishlist for ${product.name}`}
        >
          <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          <span>{product.brand}</span>
          <span className="inline-flex items-center gap-1 text-slate-900 dark:text-slate-100">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="block text-lg font-semibold text-slate-900 hover:text-violet-700 dark:text-white dark:hover:text-violet-300">
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">{product.stock} in stock</span>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            <ShoppingBag size={14} /> Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
