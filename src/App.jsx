import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useLocalStorage } from './hooks/useLocalStorage'

const AccountPage = lazy(() => import('./pages/AccountPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})

function App() {
  const [themeMode, setThemeMode] = useLocalStorage('nexora-theme', 'light')
  const [cartItems, setCartItems] = useLocalStorage('nexora-cart', [])
  const [wishlist, setWishlist] = useLocalStorage('nexora-wishlist', ['p-101'])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
    document.documentElement.style.colorScheme = themeMode === 'dark' ? 'dark' : 'light'
  }, [themeMode])

  const addToCart = (product, quantity = 1) => {
    const nextItem = {
      ...product,
      quantity,
      selectedColor: product.selectedColor || product.colors?.[0],
      selectedSize: product.selectedSize || product.sizes?.[0],
    }

    setCartItems((current) => {
      const match = current.find((item) => item.id === nextItem.id)
      if (match) {
        return current.map((item) =>
          item.id === nextItem.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, nextItem]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-lg font-medium text-slate-700 dark:text-slate-200">Loading NEXORA…</div>}>
          <Routes>
            <Route element={<Layout cartCount={cartItems.length} wishlistCount={wishlist.length} themeMode={themeMode} onToggleTheme={() => setThemeMode((current) => (current === 'dark' ? 'light' : 'dark'))} />}>
                <Route index element={<HomePage onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/shop" element={<ShopPage onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/category/:category" element={<ShopPage onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/search" element={<ShopPage onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/product/:productId" element={<ProductPage onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:orderId" element={<OrdersPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/:section" element={<AccountPage />} />
                <Route path="/login" element={<AuthPage mode="login" />} />
                <Route path="/register" element={<AuthPage mode="register" />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/products" element={<AdminPage />} />
                <Route path="/admin/orders" element={<AdminPage />} />
                <Route path="/admin/customers" element={<AdminPage />} />
                <Route path="/admin/analytics" element={<AdminPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
