import { describe, expect, it } from 'vitest'
import { calculateCartTotal, filterProducts } from './utils'
import { products } from '../data/mockData'

describe('cart utilities', () => {
  it('calculates subtotal, shipping, tax, and total reliably', () => {
    const result = calculateCartTotal([
      { price: 100, quantity: 1 },
      { price: 200, quantity: 2 },
    ])

    expect(result.subtotal).toBe(500)
    expect(result.shipping).toBe(0)
    expect(result.tax).toBeCloseTo(40)
    expect(result.total).toBeCloseTo(540)
  })
})

describe('product filters', () => {
  it('filters products by search and category', () => {
    const filtered = filterProducts(products, {
      search: 'nova',
      category: 'tech',
      minPrice: 0,
      maxPrice: 500,
      rating: 0,
      brand: 'all',
      color: 'all',
      size: 'all',
      availability: 'all',
    })

    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every((product) => product.category === 'tech')).toBe(true)
    expect(filtered.some((product) => product.name.toLowerCase().includes('nova'))).toBe(true)
  })
})
