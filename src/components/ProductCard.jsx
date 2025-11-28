import React, { useContext } from 'react'
import { CartContext } from './cart/CartContext'

export default function ProductCard({ product, navigate }){
  const { add } = useContext(CartContext)
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card">
      <div className="h-40 overflow-hidden bg-slate-50 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="font-medium">{product.title}</div>
        <div className="text-sm text-slate-500">{product.brand} — {product.category}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">R$ {product.price.toFixed(2)}</div>
          <div className="flex gap-2">
            <button onClick={()=>navigate(`/produto/${product.id}`)} className="px-2 py-1 text-xs bg-sky-50 text-sky-700 rounded">Ver</button>
            <button onClick={()=>add(product)} className="px-2 py-1 text-xs bg-teal-500 text-white rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
