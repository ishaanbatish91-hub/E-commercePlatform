import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Filter, Grid2x2, List, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import Button from '../components/ui/Button'
import { categories, products } from '../data/mockData'
import { filterProducts } from '../lib/utils'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function ShopPage({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')

  const filters = useMemo(
    () => ({
      search: searchParams.get('q') || '',
      category: searchParams.get('category') || 'all',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 500,
      rating: Number(searchParams.get('rating')) || 0,
      brand: searchParams.get('brand') || 'all',
      color: searchParams.get('color') || 'all',
      size: searchParams.get('size') || 'all',
      availability: searchParams.get('availability') || 'all',
    }),
    [searchParams],
  )

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, filters)
    const sort = searchParams.get('sort') || 'featured'

    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

    return result
  }, [filters, searchParams])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all' || value === '0') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const clearAllFilters = () => setSearchParams({})

  const brandOptions = [...new Set(products.map((product) => product.brand))]
  const colorOptions = [...new Set(products.flatMap((product) => product.colors))]
  const sizeOptions = [...new Set(products.flatMap((product) => product.sizes))]

  const activeFilterCount = Object.values(filters).filter((value) => value && value !== 'all' && value !== 0).length

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Shop</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Curated essentials</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 lg:hidden">
            <Filter size={16} /> Filters
          </button>
          <select
            value={searchParams.get('sort') || 'featured'}
            onChange={(event) => updateParam('sort', event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 md:flex">
            <button type="button" onClick={() => setViewMode('grid')} className={`rounded-full p-2 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-600'}`} aria-label="Grid view"><Grid2x2 size={16} /></button>
            <button type="button" onClick={() => setViewMode('list')} className={`rounded-full p-2 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600'}`} aria-label="List view"><List size={16} /></button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {activeFilterCount > 0 && (
          <>
            {filters.category !== 'all' && <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs text-white">{filters.category}<X size={12} /></span>}
            {filters.brand !== 'all' && <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1.5 text-xs text-slate-800">{filters.brand}<X size={12} /></span>}
            <button type="button" onClick={clearAllFilters} className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline">Clear filters</button>
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            <SlidersHorizontal size={18} className="text-slate-500" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">Category</p>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => updateParam('category', category.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${filters.category === category.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {category.name}
                    <ChevronDown size={14} className={filters.category === category.id ? 'rotate-180' : ''} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Brand</label>
              <select value={filters.brand} onChange={(e) => updateParam('brand', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none">
                <option value="all">All brands</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Price range</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={filters.minPrice} onChange={(e) => updateParam('minPrice', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" placeholder="Min" />
                <input type="number" value={filters.maxPrice} onChange={(e) => updateParam('maxPrice', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" placeholder="Max" />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Rating</label>
              <select value={filters.rating} onChange={(e) => updateParam('rating', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none">
                <option value={0}>Any rating</option>
                <option value={4}>4.0+</option>
                <option value={4.5}>4.5+</option>
                <option value={4.8}>4.8+</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Color</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updateParam('color', 'all')} className={`rounded-full border px-3 py-1.5 text-xs ${filters.color === 'all' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>All</button>
                {colorOptions.map((color) => (
                  <button key={color} type="button" onClick={() => updateParam('color', color)} className={`rounded-full border px-3 py-1.5 text-xs ${filters.color === color ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>{color}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Size</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updateParam('size', 'all')} className={`rounded-full border px-3 py-1.5 text-xs ${filters.size === 'all' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>All</button>
                {sizeOptions.map((size) => (
                  <button key={size} type="button" onClick={() => updateParam('size', size)} className={`rounded-full border px-3 py-1.5 text-xs ${filters.size === size ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>{size}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-slate-600">{filteredProducts.length} results</p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                <span>Live filters</span>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-5'}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={viewMode === 'list' ? 'rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm' : ''}>
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-slate-900">No products match these filters.</p>
              <p className="mt-2 text-sm text-slate-600">Try adjusting your price or clearing wishlist-linked filters.</p>
              <Button variant="secondary" className="mt-5" onClick={clearAllFilters}>Reset search</Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
