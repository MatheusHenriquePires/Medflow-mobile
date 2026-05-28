import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone } from 'lucide-react'
import { AppButton, Layout, TopBar } from '../components'
import { useAuth } from '../contexts/AuthContext'

export function VerifyOTP() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const handleOtpClick = (digit: number) => {
    if (otp.length < 6) {
      setOtp((prev) => prev + digit)
    }
  }

  const handleBackspace = () => {
    setOtp((prev) => prev.slice(0, -1))
  }

  const handleVerify = () => {
    if (otp.length === 6) {
      navigate('/home')
    } else {
      setError('Digite os 6 números do código para continuar.')
    }
  }

  const boxes = Array.from({ length: 6 }, (_, index) => otp[index] ?? '')

  return (
    <Layout showBottomNav={false}>
      <TopBar title="Verificar número" />
      <div className="screen__body screen__body--centered">
        <div className="verify__icon"><Smartphone size={34} strokeWidth={1.5} /></div>
        <h2>Código enviado por SMS</h2>
        <p className="verify__text">
          Enviamos um código de 6 dígitos para o número <strong>{user?.telefone ?? '(86) 9 9999-9999'}</strong>
        </p>

        <div className="otp-row" aria-label="Código de verificação">
          {boxes.map((digit, index) => {
            const isFilled = Boolean(digit)
            const isCurrent = index === otp.length && otp.length < 6

            return (
              <div
                key={`otp-${index}`}
                className={`otp-box ${isFilled ? 'is-filled' : ''} ${
                  isCurrent ? 'is-current' : ''
                }`}
              >
                {digit || (isCurrent ? '_' : '')}
              </div>
            )
          })}
        </div>

        <p className="verify__text verify__text--small">
          Não recebeu?{' '}
          <button type="button" className="link" onClick={() => setOtp('123456')}>
            Usar código demo
          </button>
        </p>
        {error && <p className="form-error">{error}</p>}

        {}
        <div className="numpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              type="button"
              className="numpad__btn"
              onClick={() => handleOtpClick(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className="numpad__btn numpad__btn--zero"
            onClick={() => handleOtpClick(0)}
          >
            0
          </button>
          <button
            type="button"
            className="numpad__btn numpad__btn--action"
            onClick={handleBackspace}
          >
            ⌫
          </button>
        </div>
      </div>

      <div className="screen__footer">
        <AppButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleVerify}
          disabled={otp.length !== 6}
        >
          Verificar
        </AppButton>
      </div>
    </Layout>
  )
}
