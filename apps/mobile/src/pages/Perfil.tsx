import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, IdCard, Mail, Phone, UserRound } from 'lucide-react'
import { AppButton, AppInput, AvatarInitials, Layout, TopBar } from '../components'
import { useAuth } from '../contexts/AuthContext'

export function Perfil() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    nome: user?.nome ?? '',
    email: user?.email ?? '',
    telefone: user?.telefone ?? '',
    cpf: user?.cpf ?? '',
    dataNascimento: user?.dataNascimento ?? '',
  })

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError('')
      setMessage('')
      await updateUser(form)
      setMessage('Perfil atualizado no banco de dados.')
      window.setTimeout(() => setMessage(''), 2200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o perfil.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Layout>
      <TopBar title="Meu Perfil" showBack={false} />

      <div className="screen__body">
        <div className="profile-header">
          <AvatarInitials name={user?.nome || 'Paciente Medflow'} size="lg" />
          <div className="profile-info">
            <h2>{user?.nome}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Informações Pessoais</h3>
          {message && <div className="inline-alert">{message}</div>}
          {error && <p className="form-error">{error}</p>}
          <AppInput id="nome" label="Nome completo" type="text" value={form.nome} icon={<UserRound size={18} strokeWidth={1.5} />} onChange={(e) => handleChange('nome', e.target.value)} />
          <AppInput id="email" label="E-mail" type="email" value={form.email} icon={<Mail size={18} strokeWidth={1.5} />} onChange={(e) => handleChange('email', e.target.value)} />
          <AppInput id="telefone" label="Telefone" type="tel" value={form.telefone} icon={<Phone size={18} strokeWidth={1.5} />} onChange={(e) => handleChange('telefone', e.target.value)} />
        </div>

        <div className="profile-section">
          <h3>Saúde</h3>
          <AppInput id="cpf" label="CPF" type="text" placeholder="000.000.000-00" value={form.cpf} icon={<IdCard size={18} strokeWidth={1.5} />} onChange={(e) => handleChange('cpf', e.target.value)} />
          <AppInput id="dataNascimento" label="Data de nascimento" type="date" value={form.dataNascimento} icon={<Calendar size={18} strokeWidth={1.5} />} onChange={(e) => handleChange('dataNascimento', e.target.value)} />
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
          <AppButton variant="accent" size="lg" fullWidth onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </AppButton>
          <AppButton variant="danger-text" fullWidth onClick={handleLogout}>
            Sair da conta
          </AppButton>
        </div>
      </div>
    </Layout>
  )
}
