import React, { useContext } from 'react'
import { products } from '../data/products'
import { CartContext } from '../components/cart/CartContext'

export default function ProductPage({ id, navigate }){
  const prod = products.find(p => p.id === id) || products[0]
  const { add } = useContext(CartContext)

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="rounded-lg overflow-hidden bg-white shadow-sm">
        <img src={prod.image} alt={prod.title} className="w-full h-96 object-cover" />
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold">{prod.title}</h1>
        <div className="text-slate-500 mt-1">{prod.brand} — {prod.category}</div>
        <div className="text-2xl font-semibold mt-4">R$ {prod.price.toFixed(2)}</div>
        <p className="mt-4 text-slate-700">Produto com inspiração surf; tecido leve e confortável — perfeito para dias de calor e curtir a praia com estilo.</p>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={()=>add(prod)} className="px-4 py-2 bg-teal-500 text-white rounded">Adicionar ao carrinho</button>
          <button onClick={()=>navigate('/loja')} className="px-4 py-2 border rounded">Continuar comprando</button>
        </div>
      </div>
    </div>
  )
}
