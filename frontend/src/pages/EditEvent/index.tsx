import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import EventForm from '../../components/EventForm'

const EditEvent: React.FC = () => {
  const { id } = useParams() as { id: string }

  return (
    <div className="page create-event">
      <Header
        title="Editar Evento"
        leftLink={{ to: `/event/${id}`, icon: <ArrowLeft />, label: 'Voltar' }}
      />

      <EventForm />
    </div>
  )
}

export default EditEvent
