import { Layout, TopBar } from '../components'
import { useAuth } from '../contexts/AuthContext'

export function Perfil() {
  const { user, updateUser } = useAuth()

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Perfil atualizado')
  }

  return (
    <Layout>
      <TopBar title="Meu Perfil" showBack={false} />

      <div className="screen__body">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-info">
            <h2>{user?.nome}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Informações Pessoais</h3>
          <div className="field">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              defaultValue={user?.nome}
              onChange={(e) => updateUser({ nome: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              defaultValue={user?.email}
              onChange={(e) => updateUser({ email: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              defaultValue={user?.telefone}
              onChange={(e) => updateUser({ telefone: e.target.value })}
            />
          </div>
        </div>

        <div className="profile-section">
          <h3>Saúde</h3>
          <div className="field">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              defaultValue={user?.cpf}
            />
          </div>

          <div className="field">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              id="dataNascimento"
              type="date"
              defaultValue={user?.dataNascimento}
            />
          </div>
        </div>

        <div className="profile-section">
          <h3>Preferências</h3>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Receber notificações de consultas</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Receber lembretes de medicamentos</span>
          </label>
        </div>

        <div className="profile-actions">
          <button type="button" className="btn btn--primary" onClick={handleSave}>
            Salvar Alterações
          </button>
          <button type="button" className="btn btn--ghost">
            Alterar Senha
          </button>
        </div>
      </div>
    </Layout>
  )
}
