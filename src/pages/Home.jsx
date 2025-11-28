import React from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home({ navigate }){
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-sky-50 to-sand-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 md:p-12 flex flex-col md:flex-row items-center gap-6 transition-colors">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">monte.surf — Vibe surf, moda masculina</h1>
          <p className="mt-3 text-slate-700 max-w-2xl">Camisetas, bermudas e moletons com design clean, pensados para quem curte surf e a cidade. Confira as novidades e aproveite frete grátis nas compras acima de R$ 199.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>navigate('/loja')} className="px-4 py-3 bg-teal-500 text-white rounded-md">Ver coleção</button>
            <button onClick={()=>navigate('/loja')} className="px-4 py-3 border border-slate-200 rounded-md">Novidades</button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b1f7a95cee6f67c1344d7b3b4b2ee3c" className="rounded-xl shadow-md hover:scale-[1.01] transition-transform" alt="surf" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Destaques</h2>
          <button onClick={()=>navigate('/loja')} className="text-sky-600">Ver tudo</button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-100 to-sand-50 rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <h3 className="font-semibold text-lg">Sustentabilidade</h3>
            <p className="mt-2 text-sm text-slate-700">Peças produzidas com algodão orgânico e materiais recicláveis, com foco em durabilidade e baixo impacto ambiental.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1520975910000-0f97e5e1f1b8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=a9d6cc1e4b9c1f9ea5a1e1d1b1c0c1c" className="w-36 h-36 rounded-md object-cover" alt="sustentavel" />
        </div>
      </section>
    </div>
  )
}
