import React, { useContext, useState } from 'react'
import { CartContext } from '../components/cart/CartContext'

export default function Checkout({ navigate }){
  const { items, total, clear } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const doMockCheckout = () => {
    setLoading(true)
    setTimeout(()=>{ setLoading(false); clear(); navigate('/') }, 1500)
  }

  const doStripeCheckout = async () => {
    // call backend to create a checkout session
    setLoading(true)
    try{
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })
      const data = await res.json()
      if(data.url) window.location.href = data.url
      else {
        doMockCheckout()
      }
    }catch(err){
      console.error(err); doMockCheckout()
    }
  }

  if(!user) return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="font-semibold">Faça login para finalizar a compra</h3>
      <div className="mt-3"><button onClick={()=>navigate('/auth')} className="px-4 py-2 rounded bg-teal-500 text-white">Entrar / Registrar</button></div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="mt-4">
        <div className="text-sm text-slate-600">Comprador: {user.email}</div>
        <div className="mt-4">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between border-b py-3">
              <div className="flex items-center gap-3"><img src={it.image} alt={it.title} className="w-12 h-12 rounded object-cover"/>
                <div>{it.title}</div>
              </div>
              <div>R$ { (it.price * it.qty).toFixed(2) }</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">Total</div>
          <div className="text-lg font-bold">R$ {total.toFixed(2)}</div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={doStripeCheckout} disabled={loading} className="px-4 py-2 bg-sky-600 text-white rounded">Pagar com Stripe</button>
          <button onClick={doMockCheckout} disabled={loading} className="px-4 py-2 border rounded">Pagar (modo demo)</button>
        </div>
        {loading && <div className="mt-2 text-sm text-slate-500">Processando...</div>}
      </div>
    </div>
  )
}
