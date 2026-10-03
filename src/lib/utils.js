export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export const calculateCartTotal = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 300 ? 0 : items.length ? 18 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  return { subtotal, shipping, tax, total }
}

export const filterProducts = (items, filters = {}) => {
  const { search = '', category = 'all', minPrice = 0, maxPrice = 500, rating = 0, brand = 'all', color = 'all', size = 'all', availability = 'all' } = filters

  return items.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = category === 'all' || product.category === category
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice
    const matchesRating = product.rating >= Number(rating)
    const matchesBrand = brand === 'all' || product.brand.toLowerCase() === brand.toLowerCase()
    const matchesColor = color === 'all' || product.colors.some((c) => c.toLowerCase() === color.toLowerCase())
    const matchesSize = size === 'all' || product.sizes.some((s) => s.toLowerCase() === size.toLowerCase())
    const matchesAvailability = availability === 'all' || (availability === 'in-stock' ? product.stock > 0 : product.stock === 0)

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesBrand && matchesColor && matchesSize && matchesAvailability
  })
}

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
