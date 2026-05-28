import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, IdCard, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { AppButton, AppInput, Layout, TopBar } from '../components'

interface FormState {
  nome: string
  email: string
  telefone: string
  senha: string
  cpf: string
  dataNascimento: string
}

export function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState<FormState>({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(86) 9 9999-9999',
    senha: '12345678',
    cpf: '123.456.789-00',
    dataNascimento: '1995-04-12',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const submitSignup = async () => {
    if (!form.nome || !form.email.includes('@') || form.senha.length < 6) {
      setError('Preencha nome, e-mail válido e senha com pelo menos 6 caracteres.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await signup(form)
      navigate('/verify-otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar sua conta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitSignup()
  }

  return (
    <Layout showBottomNav={false}>
      <TopBar title="Criar conta" />
      <div className="screen__body">
        <form onSubmit={handleSubmit} className="form">
          <AppInput id="nome" label="Nome completo" type="text" value={form.nome} icon={<UserRound size={18} strokeWidth={1.5} />} onChange={handleChange} />
          <AppInput id="email" label="E-mail" type="email" value={form.email} icon={<Mail size={18} strokeWidth={1.5} />} onChange={handleChange} />
          <AppInput id="telefone" label="Telefone" type="tel" value={form.telefone} icon={<Phone size={18} strokeWidth={1.5} />} onChange={handleChange} />
          <AppInput id="senha" label="Senha" type="password" value={form.senha} icon={<LockKeyhole size={18} strokeWidth={1.5} />} onChange={handleChange} />
          <AppInput id="cpf" label="CPF" type="text" value={form.cpf} icon={<IdCard size={18} strokeWidth={1.5} />} onChange={handleChange} />
          <AppInput id="dataNascimento" label="Data de nascimento" type="date" value={form.dataNascimento} icon={<Calendar size={18} strokeWidth={1.5} />} onChange={handleChange} />
          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
      <div className="screen__footer">
        <AppButton variant="primary" size="lg" fullWidth onClick={submitSignup} disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Continuar'}
        </AppButton>
        <div className="divider">
          <span>ou entre com</span>
        </div>
        <AppButton variant="ghost" fullWidth onClick={submitSignup} disabled={isSubmitting}>
          Criar conta demo
        </AppButton>
      </div>
    </Layout>
  )
}
