import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Layout, TopBar } from '../components'

interface FormState {
  nome: string
  email: string
  telefone: string
  senha: string
}

export function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState<FormState>({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(86) 9 9999-9999',
    senha: '12345678',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(form)
    navigate('/verify-otp')
  }

  return (
    <Layout showBottomNav={false}>
      <TopBar title="Criar conta" />
      <div className="screen__body">
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
            />
            <p className="field__hint">
              CPF e data de nascimento serão pedidos no próximo passo.
            </p>
          </div>
        </form>
      </div>
      <div className="screen__footer">
        <button type="submit" className="btn btn--primary" onClick={handleSubmit}>
          Continuar
        </button>
        <div className="divider">
          <span>ou entre com</span>
        </div>
        <button type="button" className="btn btn--social">
          <span className="google-badge">G</span>
          Continuar com Google
        </button>
      </div>
    </Layout>
  )
}
