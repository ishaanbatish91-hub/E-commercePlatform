import { Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck, Heart, ChevronLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import { products } from '../data/mockData'
import { formatCurrency } from '../lib/utils'

export default function ProductPage({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === productId) || products[0]
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  const relatedProducts = useMemo(() => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3), [product])
  const isWishlisted = wishlist.includes(product.id)

  if (!product) {
    navigate('/404')
    return null
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
        <ChevronLeft size={16} /> Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
            <img src={selectedImage} alt={product.name} className="h-[560px] w-full rounded-[22px] object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image) => (
              <button key={image} type="button" onClick={() => setSelectedImage(image)} className={`overflow-hidden rounded-2xl border ${selectedImage === image ? 'border-slate-900' : 'border-slate-200'} bg-white p-1`}>
                <img src={image} alt={product.name} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{product.brand}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-900">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-slate-900">{formatCurrency(product.price)}</span>
            <span className="text-lg text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">Save 28%</span>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button key={color} type="button" onClick={() => setSelectedColor(color)} className={`rounded-full border px-3 py-1.5 text-sm ${selectedColor === color ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`rounded-full border px-3 py-1.5 text-sm ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
                  <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="p-3 text-slate-700"><Minus size={16} /></button>
                  <span className="min-w-10 text-center text-sm font-medium text-slate-900">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((prev) => prev + 1)} className="p-3 text-slate-700"><Plus size={16} /></button>
                </div>
                <span className="text-sm text-slate-500">{product.stock} items available</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="flex-1 gap-2 px-5 py-3" onClick={() => onAddToCart({ ...product, quantity, selectedColor, selectedSize })}>
                <ShoppingBag size={16} /> Add to cart
              </Button>
              <Button variant="secondary" className="gap-2 px-5 py-3" onClick={() => onToggleWishlist(product.id)}>
                <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} /> Wishlist
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
              <Truck className="mb-2 text-slate-900" size={18} />
              Delivery estimate: 2–4 business days
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
              <ShieldCheck className="mb-2 text-slate-900" size={18} />
              Free 30-day returns on selected items
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">Product overview</h2>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-violet-500" />{feature}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Specifications</h3>
          <dl className="mt-5 space-y-4 text-sm text-slate-700">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-none last:pb-0">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900">You may also like</h2>
          <Link to="/shop" className="text-sm font-medium text-slate-700 hover:text-slate-900">Browse all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
              <img src={item.images[0]} alt={item.name} className="h-60 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.brand}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">{formatCurrency(item.price)}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{item.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
