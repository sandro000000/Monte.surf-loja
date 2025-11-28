import React, { useState, useMemo, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Shop({ navigate, queryParams }){
  const [category, setCategory] = useState('All')
  const [size, setSize] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [page, setPage] = useState(1)
  const perPage = 6

  const categories = useMemo(()=>['All', ...new Set(products.map(p=>p.category))], [])
  const sizes = useMemo(()=>['All', ...new Set(products.flatMap(p=>p.sizes || []))], [])

  useEffect(()=>{ if(queryParams?.q){ setSearch(queryParams.q) } }, [queryParams])

  const filtered = products.filter(p => (
    (category === 'All' || p.category === category) &&
    (size === 'All' || (p.sizes || []).includes(size)) &&
    (p.price >= minPrice && p.price <= maxPrice) &&
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  ))

  const sorted = filtered.slice().sort((a,b)=>{
    if(sort === 'price-asc') return a.price - b.price
    if(sort === 'price-desc') return b.price - a.price
    if(sort === 'name') return a.title.localeCompare(b.title)
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const startIndex = (page - 1) * perPage
  const paged = sorted.slice(startIndex, startIndex + perPage)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Loja</h2>
        <div className="flex items-center gap-3">
          <input placeholder="Buscar produtos" value={search} onChange={(e)=>{ setSearch(e.target.value); setPage(1) }} className="px-3 py-2 border rounded" />
          <select value={category} onChange={(e)=>{ setCategory(e.target.value); setPage(1)}} className="px-3 py-2 border rounded">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={size} onChange={(e)=>{ setSize(e.target.value); setPage(1) }} className="px-3 py-2 border rounded">
            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={(e)=>{ setSort(e.target.value); setPage(1) }} className="px-3 py-2 border rounded">
            <option value="featured">Mais relevantes</option>
            <option value="price-asc">Preço: menor</option>
            <option value="price-desc">Preço: maior</option>
            <option value="name">Nome</option>
          </select>
          <div className="flex items-center gap-2">
            <input type="number" value={minPrice} onChange={(e)=>{ setMinPrice(Number(e.target.value || 0)); setPage(1) }} className="w-20 px-2 py-2 border rounded" />
            <span className="text-slate-500">—</span>
            <input type="number" value={maxPrice} onChange={(e)=>{ setMaxPrice(Number(e.target.value || 1000)); setPage(1) }} className="w-20 px-2 py-2 border rounded" />
          </div>
          <button onClick={()=>{ setCategory('All'); setSize('All'); setSearch(''); setMinPrice(0); setMaxPrice(1000); setSort('featured'); setPage(1) }} className="px-3 py-2 border rounded">Limpar</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paged.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button disabled={page === 1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Anterior</button>
        <div> Página {page} de {totalPages}</div>
        <button disabled={page === totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded">Próximo</button>
      </div>
    </div>
  )
}
