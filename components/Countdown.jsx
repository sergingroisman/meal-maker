import { useEffect, useState } from 'react'

const Countdown = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 0 })

  useEffect(() => {
    // Função para calcular o tempo restante
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const target = new Date(formatDate(targetDate)).getTime()
      const distance = target - now

      if (distance < 0) {
        setTimeRemaining({ minutes: 0 })
      } else {
        const minutes = Math.floor(distance / (1000 * 60)) // Converte milissegundos para minutos
        setTimeRemaining({ minutes })
      }
    }

    // Atualiza o countdown a cada minuto
    const interval = setInterval(() => {
      calculateTimeRemaining()
    }, 60000) // Atualiza a cada 60 segundos

    // Chama a função imediatamente para definir o estado inicial
    calculateTimeRemaining()

    return () => clearInterval(interval) // Limpa o intervalo ao desmontar
  }, [targetDate])

  // Função para formatar a data recebida
  const formatDate = (dateString) => {
    // Adiciona "Z" para indicar UTC, já que não há informação de fuso horário
    return dateString + 'Z'
  }

  return (
    <>
      {/* <div className="w-6 h-6 bg-gray-400 rounded-lg flex items-center justify-center text-white text-md">
        {timeRemaining.minutes > 0 ? `${timeRemaining.minutes} min` : 'OT'}
      </div> */}
    </>
  )
}

export default Countdown
