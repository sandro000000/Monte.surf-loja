import React, { useState } from 'react'

export default function Footer({ navigate }){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if(!email.includes('@')) { setMsg('Insira um e-mail válido'); return }
    setMsg('Obrigado por se inscrever!')
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden bg-sky-900 dark:bg-slate-900 text-white">
      <div className="absolute inset-x-0 -top-1 h-40 md:h-52 bg-[url('/src/assets/wave.svg')] bg-no-repeat bg-center bg-contain opacity-20 animate-wave"></div>
      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="absolute -top-6 right-6 md:-top-12 md:right-12 rotate-3 animate-surfboard">
          <div className="w-14 h-6 bg-gradient-to-r from-orange-300 via-orange-400 to-pink-300 rounded-full shadow-lg flex items-center justify-center text-xs text-slate-800 font-semibold">🏄</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl">monte.surf</h3>
            <p className="mt-2 text-sm text-slate-200 max-w-md">Roupas masculinas com a vibe surf — modernidade, conforto e estilo pra curtir a praia ou a cidade.</p>
            <div className="mt-4 flex gap-3">
              <a className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20" href="#">IG</a>
              <a className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20" href="#">FB</a>
              <a className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20" href="#">TT</a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Links</h4>
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="text-sm text-sky-100 hover:underline cursor-pointer">Início</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/loja')}} className="text-sm text-sky-100 hover:underline cursor-pointer">Loja</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="text-sm text-sky-100 hover:underline cursor-pointer">Coleção</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/')}} className="text-sm text-sky-100 hover:underline cursor-pointer">Contato</a>
          </div>

          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <form className="mt-2 flex gap-2" onSubmit={subscribe}>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Seu e-mail" className="px-3 py-2 rounded-md bg-white/10 outline-none text-white placeholder-white/60"/>
              <button className="bg-orange-400 text-slate-900 px-3 py-2 rounded-md">Inscrever</button>
            </form>
            {msg && <p className="mt-2 text-sm text-sky-100">{msg}</p>}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-sky-100 flex items-center justify-between">
          <div>© {new Date().getFullYear()} monte.surf — Todos os direitos reservados</div>
          <div>Feito com ❤️ para surfistas</div>
        </div>
      </div>

      <style>{`@keyframes wave { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .animate-wave { animation: wave 14s linear infinite; }
        .animate-surfboard { animation: bob 3s ease-in-out infinite; transform-origin: center; }
        @keyframes bob { 0% { transform: translateY(0) rotate(3deg) } 50% { transform: translateY(-6px) rotate(-1deg) } 100% { transform: translateY(0) rotate(3deg) } }
        footer{z-index:10}
        `}</style>
    </footer>
  )
}
