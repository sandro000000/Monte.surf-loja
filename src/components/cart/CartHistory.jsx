import React from 'react'

export default function CartHistory({ ops = [], onExportJSON, onExportCSV, onSync, onClear }){
  return (
    <div className="p-4 border rounded bg-slate-50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Histórico de operações</div>
        <div className="flex gap-2">
          <button onClick={onExportJSON} className="text-sm px-2 py-1 bg-slate-200 rounded">JSON</button>
          <button onClick={onExportCSV} className="text-sm px-2 py-1 bg-slate-200 rounded">CSV</button>
          <button onClick={onSync} className="text-sm px-2 py-1 bg-teal-500 text-white rounded">Sincronizar</button>
          <button onClick={onClear} className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded">Limpar</button>
        </div>
      </div>
      <div className="max-h-48 overflow-auto">
        {(!ops || !ops.length) && <div className="text-sm text-slate-500">Nenhuma operação registrada</div>}
        {ops.map(op => (
          <div key={op.id} className="border-b py-2 text-sm">
            <div className="font-medium">{op.type.toUpperCase()} {op.product?.title ? `— ${op.product.title}` : ''}</div>
            <div className="text-xs text-slate-500">{new Date(op.time).toLocaleString()} — id: {op.id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
