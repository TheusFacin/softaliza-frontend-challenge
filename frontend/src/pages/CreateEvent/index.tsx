import React from 'react'
import Header from '../../components/Header'
import { ArrowLeft } from 'react-feather'
import EventForm from '../../components/EventForm'

const CreateEvent: React.FC = () => {
  return (
    <div className="page create-event">
      <Header
        title="Adicionar Evento"
        leftLink={{ to: '/', icon: <ArrowLeft />, label: 'Voltar' }}
      />

      <EventForm />
    </div>
  )
}

export default CreateEvent
