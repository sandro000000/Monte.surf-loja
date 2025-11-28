import React, { useState, useEffect } from 'react'

export default function Auth({ navigate }){
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(()=>{ setMsg('') }, [mode, email, password])

  const onSubmit = (e) => {
    e.preventDefault()
    if(!email || password.length < 4) { setMsg('Preencha os campos corretamente'); return }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if(mode === 'register'){
      if(users.find(u=>u.email === email)) { setMsg('Usuário já cadastrado'); return }
      users.push({ email, password, name: email.split('@')[0] })
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('user', JSON.stringify({ email }))
      navigate('/')
      return
    }

    const user = users.find(u => u.email === email && u.password === password)
    if(!user){ setMsg('Credenciais inválidas'); return }
    localStorage.setItem('user', JSON.stringify({ email, name: user.name }))
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">{mode === 'login' ? 'Entrar' : 'Criar conta'}</h2>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
        <input placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-3 py-2 rounded border" />
        <input placeholder="Senha" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="px-3 py-2 rounded border" />
        {msg && <div className="text-sm text-red-500">{msg}</div>}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-teal-500 text-white rounded">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</button>
          <button type="button" onClick={()=>setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-slate-600">{mode === 'login' ? 'Criar conta' : 'Já tenho conta'}</button>
        </div>
      </form>
    </div>
  )
}
