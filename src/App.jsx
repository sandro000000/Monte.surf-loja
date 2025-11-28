import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './components/cart/CartContext'
import CartDrawer from './components/cart/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'

// Very simple router (no deps)
function App() {
  const [route, setRoute] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const state = window.history.state || {}
  let Page
  if (route.startsWith('/produto')) Page = <ProductPage id={route.split('/produto/')[1]} navigate={navigate} />
  else if (route.startsWith('/loja')) Page = <Shop navigate={navigate} queryParams={state} />
  else if (route.startsWith('/auth')) Page = <Auth navigate={navigate} />
  else if (route.startsWith('/checkout')) Page = <Checkout navigate={navigate} />
  else Page = <Home navigate={navigate} />

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-sand-50 text-slate-900">
        <Header navigate={navigate} />
        <main className="flex-grow min-h-0 overflow-auto container mx-auto px-4 sm:px-6 py-8 pb-24">{Page}</main>
        <Footer navigate={navigate} />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}

export default App
