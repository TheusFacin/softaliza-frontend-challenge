import React from 'react'
import { useHistory } from 'react-router'
import { ArrowLeft } from 'react-feather'
import api from '../../services/api'
import { ICreateEvent } from '../../types'

import Header from '../../components/Header'
import EventForm from '../../components/EventForm'

const CreateEvent: React.FC = () => {
  const history = useHistory()

  const handleSubmit = async (data: ICreateEvent) => {
    try {
      const response = await api.post('/events', {
        ...data,
        date: data.date.toJSON(),
      })

      const { _id } = response.data as { _id: string }

      alert(
        'Evento criado com sucesso\nVocê será redirecionado para a página do evento'
      )

      history.push(`/event/${_id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="page create-event">
      <Header
        title="Adicionar Evento"
        leftLink={{ to: '/', icon: <ArrowLeft />, label: 'Voltar' }}
      />

      <EventForm buttonText="Criar Evento" submitFunction={handleSubmit} />
    </div>
  )
}

export default CreateEvent
