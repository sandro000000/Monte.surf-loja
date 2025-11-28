import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from './cart/CartContext'
import logo from '../assets/logo.svg'

export default function Header({ navigate }) {
  const { openCart, itemsCount } = useContext(CartContext)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const onSearch = (e) => {
    e.preventDefault()
    const q = search.trim()
    const path = q ? `/loja` : `/loja`
    navigate(path)
    // attach query state via history state for simplicity
    window.history.replaceState({ q }, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const logout = () => { localStorage.removeItem('user'); navigate('/') }

  useEffect(()=>{
    if(theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-2" href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}}>
            <img src={logo} alt="monte.surf" className="w-10 h-10"/>
            <div className="font-semibold text-lg">monte.surf</div>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="hover:underline">Início</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/loja')}} className="hover:underline">Loja</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="hover:underline">Coleção</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="hover:underline">Sobre</a>
        </nav>

        <form onSubmit={onSearch} className="flex items-center gap-2 flex-1 md:flex-none md:w-72">
          <input placeholder="Pesquisar camiseta, bermuda..." value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-teal-300 outline-none bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" />
        </form>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">{user.email.split('@')[0]}</div>
              <button onClick={()=>navigate('/checkout')} className="px-3 py-2 bg-sky-50 text-sky-700 rounded-md text-sm">Checkout</button>
              <button onClick={logout} className="px-2 py-1 text-xs border rounded">Sair</button>
            </div>
          ) : (
            <button onClick={()=>navigate('/auth')} className="bg-sky-50 text-sky-700 px-3 py-2 rounded-md text-sm">Conta</button>
          )}

          <button onClick={() => openCart()} className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            {itemsCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemsCount}</span>}
          </button>
        </div>
        <div className="ml-2">
          <button onClick={toggleTheme} className="p-2 rounded-md bg-sky-50 dark:bg-slate-700 transition-colors">{theme === 'dark' ? '🌙' : '☀️'}</button>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 flex flex-col gap-2">
            <a onClick={(e)=>{e.preventDefault(); setOpen(false); navigate('/')}} href="#">Início</a>
            <a onClick={(e)=>{e.preventDefault(); setOpen(false); navigate('/loja')}} href="#">Loja</a>
            <a onClick={(e)=>{e.preventDefault(); setOpen(false); navigate('/')}} href="#">Coleção</a>
            <a onClick={(e)=>{e.preventDefault(); setOpen(false); navigate('/')}} href="#">Sobre</a>
          </div>
        </div>
      )}
    </header>
  )
}
