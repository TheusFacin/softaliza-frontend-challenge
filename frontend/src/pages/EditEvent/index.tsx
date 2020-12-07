import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import EventForm from '../../components/EventForm'
import { IEvent } from '../../types'
import api from '../../services/api'

const EditEvent: React.FC = () => {
  const { id } = useParams() as { id: string }
  const [event, setEvent] = useState<IEvent>()

  useEffect(() => {
    if (id) {
      ;(async () => {
        const response = await api.get(`events/${id}`)
        const eventResponse = response.data as IEvent

        const event = {
          ...eventResponse,
          date: new Date(eventResponse.date),
        }

        setEvent(event)
      })()
    }
  }, [id])

  return (
    <div className="page create-event">
      <Header
        title="Editar Evento"
        leftLink={{ to: `/event/${id}`, icon: <ArrowLeft />, label: 'Voltar' }}
      />

      {event && <EventForm event={event} buttonText="Salvar Evento" />}
    </div>
  )
}

export default EditEvent
