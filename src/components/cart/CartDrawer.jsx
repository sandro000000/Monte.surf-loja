import React, { useContext, useState } from 'react'
import { CartContext } from './CartContext'
import CartHistory from './CartHistory'

export default function CartDrawer(){
  const { items, isOpen, closeCart, remove, updateQty, total } = useContext(CartContext)
  const { ops, exportOpsJSON, exportOpsCSV, syncOps, clearOps } = useContext(CartContext)
  const [showHistory, setShowHistory] = useState(false)
  if(!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart}></div>
      <div className="ml-auto w-full md:w-96 bg-white h-full shadow-xl p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Seu carrinho</h3>
          <button onClick={closeCart} className="text-slate-500">Fechar</button>
        </div>

        <div className="flex-1 mt-4 overflow-auto">
          {items.length === 0 && <div className="text-slate-500">Seu carrinho está vazio</div>}
          {items.map(it => (
            <div key={it.id} className="flex items-center gap-3 border-b py-3">
              <img src={it.image} className="w-16 h-16 rounded-md object-cover" alt="produto"/>
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-slate-500">{it.size || 'Único'}</div>
                <div className="text-sm text-slate-600 mt-1">R$ {it.price.toFixed(2)}</div>
              </div>
              <div className="flex flex-col items-end">
                <input value={it.qty} type="number" onChange={(e)=>updateQty(it.id, Math.max(1, Number(e.target.value || 1)))} className="w-14 border px-2 py-1 rounded text-center" />
                <button onClick={()=>remove(it.id)} className="text-sm text-red-500 mt-2">Remover</button>
              </div>
            </div>
          ))}
        </div>

          <div className="pt-4 border-t flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Total</div>
            <div className="font-bold text-lg">R$ {total.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-200 rounded-md">Continuar comprando</button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-md">Finalizar</button>
          </div>
        </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">Operações</div>
              <div className="flex gap-2">
                <button onClick={()=>setShowHistory(s => !s)} className="px-2 py-1 bg-slate-200 rounded text-sm">Histórico</button>
                <button onClick={exportOpsJSON} className="px-2 py-1 bg-slate-200 rounded text-sm">Exportar JSON</button>
                <button onClick={exportOpsCSV} className="px-2 py-1 bg-slate-200 rounded text-sm">Exportar CSV</button>
                <button onClick={async ()=>{ try{ await syncOps(); alert('Sincronizado com sucesso') }catch(e){ alert('Erro ao sincronizar') } }} className="px-2 py-1 bg-teal-500 text-white rounded text-sm">Sincronizar</button>
                <button onClick={clearOps} className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">Limpar Histórico</button>
              </div>
            </div>
            {showHistory && <CartHistory ops={ops} onExportJSON={exportOpsJSON} onExportCSV={exportOpsCSV} onSync={syncOps} onClear={clearOps} />}
          </div>
      </div>
    </div>
  )
}
