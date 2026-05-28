import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { AppButton, AppInput, Layout, MedflowLogo } from '../components'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({
    email: 'joao@email.com',
    senha: '12345678',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLogin = async () => {
    if (!form.email.includes('@') || form.senha.length < 6) {
      setError('Informe um e-mail válido e senha com pelo menos 6 caracteres.')
      return
    }

    const demoUser = {
      nome: 'João Silva',
      email: form.email,
      telefone: '(86) 9 9999-9999',
      senha: form.senha,
      cpf: '123.456.789-00',
      dataNascimento: '1995-04-12',
    }
    try {
      setIsSubmitting(true)
      setError('')
      await login(demoUser)
      navigate('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    submitLogin()
  }

  return (
    <Layout showBottomNav={false} statusBarTheme="light">
      <div className="screen auth-screen">
        <div className="screen__body screen__body--centered">
          <MedflowLogo />
          <h1>Bem-vindo ao Medflow</h1>
          <p>Sua saúde, na palma da mão</p>

          <form onSubmit={handleLogin} className="form">
            <AppInput
              id="email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              icon={<Mail size={18} strokeWidth={1.5} />}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            <AppInput
              id="senha"
              label="Senha"
              type="password"
              placeholder="Sua senha"
              value={form.senha}
              icon={<LockKeyhole size={18} strokeWidth={1.5} />}
              onChange={(event) => setForm((current) => ({ ...current, senha: event.target.value }))}
            />
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
        <div className="screen__footer">
          <AppButton variant="primary" size="lg" fullWidth onClick={submitLogin} disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </AppButton>
          <div className="divider">
            <span>ou entre com</span>
          </div>
          <AppButton variant="ghost" fullWidth onClick={submitLogin} disabled={isSubmitting}>
            Entrar em modo demonstração
          </AppButton>
          <p className="terms">
            Não tem conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="link"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </Layout>
  )
}
