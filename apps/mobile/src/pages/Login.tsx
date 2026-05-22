import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Layout } from '../components/Layout'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular login
    const demoUser = {
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(86) 9 9999-9999',
      senha: '12345678',
    }
    login(demoUser)
    navigate('/home')
  }

  return (
    <Layout showBottomNav={false} statusBarTheme="light">
      <div className="screen">
        <div className="screen__body screen__body--centered">
          <div className="login-icon">🏥</div>
          <h1>Bem-vindo ao Medflow</h1>
          <p>Sua saúde, na palma da mão</p>

          <form onSubmit={handleLogin} className="form">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                defaultValue="joao@email.com"
              />
            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Sua senha"
                defaultValue="12345678"
              />
            </div>
          </form>
        </div>
        <div className="screen__footer">
          <button type="submit" className="btn btn--primary" onClick={handleLogin}>
            Entrar
          </button>
          <div className="divider">
            <span>ou entre com</span>
          </div>
          <button type="button" className="btn btn--social">
            <span className="google-badge">G</span>
            Entrar com Google
          </button>
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
