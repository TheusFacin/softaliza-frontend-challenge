import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import EventForm from '../../components/EventForm'
import { ICreateEvent, IEvent } from '../../types'
import api from '../../services/api'

const EditEvent: React.FC = () => {
  const { id } = useParams() as { id: string }
  const [event, setEvent] = useState<IEvent>()

  const history = useHistory()

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

  const handleSubmit = async (data: ICreateEvent) => {
    try {
      await api.patch(`/events/${id}`, {
        ...data,
        date: data.date.toJSON(),
      })

      alert(
        'Evento alterado com sucesso\nVocê será redirecionado para a página do evento'
      )

      history.push(`/event/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="page create-event">
      <Header
        title="Editar Evento"
        leftLink={{ to: `/event/${id}`, icon: <ArrowLeft />, label: 'Voltar' }}
      />

      {event && (
        <EventForm
          event={event}
          buttonText="Salvar Evento"
          submitFunction={handleSubmit}
        />
      )}
    </div>
  )
}

export default EditEvent
