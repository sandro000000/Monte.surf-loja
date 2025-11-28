import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)
  const [ops, setOps] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cartOps')) || [] } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem('cartOps', JSON.stringify(ops)) }, [ops])

  const serverURL = (import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : 'http://localhost:4242'

  const logOperation = (type, product, details = {}) => {
    const op = { id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, type, product: { id: product?.id, title: product?.title, price: product?.price }, qty: product?.qty ?? null, time: new Date().toISOString(), details }
    setOps(prev => [...prev, op])
    return op
  }

  const clearOps = () => setOps([])

  const exportOpsJSON = () => {
    const fileName = `ops-${new Date().toISOString()}.json`
    const blob = new Blob([JSON.stringify(ops, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportOpsCSV = () => {
    if(!ops || !ops.length) return
    const keys = ['id', 'type', 'product.id', 'product.title', 'qty', 'time']
    const rows = ops.map(o => [o.id, o.type, o.product?.id, o.product?.title, o.qty ?? '', o.time])
    const csv = [keys.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ops-${new Date().toISOString()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const syncOps = async () => {
    try {
      const resp = await fetch(`${serverURL}/operations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ops) })
      if(!resp.ok) throw new Error('sync failed')
      return await resp.json()
    } catch (err) {
      console.error('syncOps error', err)
      throw err
    }
  }

  const add = (product) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      if(idx >= 0) {
        const copy = [...prev]
        copy[idx].qty += 1
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
    logOperation('add', product)
  }

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const removeWithLog = (id) => {
    const found = items.find(p => p.id === id)
    logOperation('remove', found || { id })
    setItems(prev => prev.filter(p => p.id !== id))
  }
  const updateQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  const updateQtyWithLog = (id, qty) => {
    const found = items.find(p => p.id === id)
    logOperation('update', { ...found, qty }, { newQty: qty })
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  }
  const clear = () => setItems([])
  const clearWithLog = () => {
    logOperation('clear', null)
    setItems([])
  }
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const itemsCount = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s,i)=>s + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ items, add, remove: removeWithLog, updateQty: updateQtyWithLog, clear: clearWithLog, openCart, closeCart, isOpen, itemsCount, total, ops, logOperation, exportOpsJSON, exportOpsCSV, syncOps, clearOps }}>
      {children}
    </CartContext.Provider>
  )
}
