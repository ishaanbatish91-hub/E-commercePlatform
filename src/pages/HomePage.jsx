import { ArrowRight, ChevronRight, ShieldCheck, Truck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products, featuredCollections, testimonials } from '../data/mockData'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'

export default function HomePage({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 lg:px-6">
        <div className="rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_42%,#f8fafc_100%)] p-5 md:p-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.22),_transparent_25%),linear-gradient(135deg,#020817_0%,#0f172a_50%,#111827_100%)]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 dark:border-violet-600 dark:bg-violet-500/10 dark:text-violet-200">
                <Sparkles size={14} /> New season essentials
              </div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-900 md:text-6xl dark:text-white">
                Discover better. Shop smarter.
              </h1>
              <p className="mt-5 max-w-lg text-base text-slate-600 md:text-lg dark:text-slate-300">
                Premium essentials for home, performance, and everyday life—curated for modern routines.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop"><Button className="px-6 py-3">Shop now</Button></Link>
                <Link to="/shop?sort=rating"><Button variant="secondary" className="px-6 py-3 dark:border-slate-700 dark:text-slate-100 dark:bg-slate-900">Explore bestsellers</Button></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-8 text-sm text-slate-600 dark:text-slate-300">
                <div><span className="block text-2xl font-semibold text-slate-900 dark:text-white">12k+</span>happy shoppers</div>
                <div><span className="block text-2xl font-semibold text-slate-900 dark:text-white">4.9/5</span>average rating</div>
                <div><span className="block text-2xl font-semibold text-slate-900 dark:text-white">48h</span>dispatch time</div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/80 p-4 shadow-soft dark:bg-slate-900/80">
              <div className="overflow-hidden rounded-[24px]">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
                  alt="Model wearing premium outfit"
                  className="h-[520px] w-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Air Flow</div>
                  <div>Movement</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Nova</div>
                  <div>Precision</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Luma</div>
                  <div>Comfort</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {featuredCollections.map((collection) => (
            <div key={collection.title} className={`rounded-[28px] bg-gradient-to-br ${collection.accent} p-6 text-white shadow-soft`}>
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/80">Featured edit</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{collection.title}</h2>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-white/80">{collection.subtitle}</p>
                  <Link to="/shop" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Trending now</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Best-loved picks</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Why NEXORA</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Built for better everyday decisions.</h2>
            </div>
            <Link to="/shop" className="text-sm font-medium text-violet-200 hover:text-white">Discover more</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-slate-700 bg-slate-800/70 p-6">
              <Truck className="text-violet-300" />
              <h3 className="mt-4 text-xl font-semibold">Fast delivery</h3>
              <p className="mt-2 text-sm text-slate-300">Carefully packed shipments with tracking and next-day dispatch on best sellers.</p>
            </div>
            <div className="rounded-[28px] border border-slate-700 bg-slate-800/70 p-6">
              <ShieldCheck className="text-violet-300" />
              <h3 className="mt-4 text-xl font-semibold">Quality guaranteed</h3>
              <p className="mt-2 text-sm text-slate-300">Premium materials, concise specs, and thoughtful product details that reduce uncertainty.</p>
            </div>
            <div className="rounded-[28px] border border-slate-700 bg-slate-800/70 p-6">
              <Sparkles className="text-violet-300" />
              <h3 className="mt-4 text-xl font-semibold">Themed collections</h3>
              <p className="mt-2 text-sm text-slate-300">Curated edits designed around movement, comfort, work, and home rituals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Editorial picks</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Curated for your routines</h2>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] bg-slate-100 dark:bg-slate-900">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" alt="Friends browsing a clothing collection" className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-5">
            <div className="rounded-[28px] bg-violet-50 p-8 dark:bg-violet-950/50">
              <p className="text-xs uppercase tracking-[0.18em] text-violet-600">Moodboard</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Built for calm, focused living.</h3>
              <p className="mt-4 max-w-md text-slate-600 dark:text-slate-300">Upgrade your space and your flow with pieces that feel premium without excess.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[28px] bg-slate-900 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">For work</p>
                <h3 className="mt-3 text-2xl font-semibold">Desk setups</h3>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">For motion</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Performance</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Customer love</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Loved by thoughtful shoppers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => <span key={index}>★</span>)}
              </div>
              <p className="text-base leading-7 text-slate-700 dark:text-slate-300">“{item.quote}”</p>
              <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
