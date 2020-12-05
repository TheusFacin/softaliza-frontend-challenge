import React from 'react'
import Header from '../../components/Header'
import { ArrowLeft } from 'react-feather'

const CreateEvent: React.FC = () => {
  return (
    <div className="page create-event">
      <Header
        title="Adicionar Evento"
        leftLink={{ to: '/', icon: <ArrowLeft />, label: 'Voltar' }}
      />
    </div>
  )
}

export default CreateEvent
