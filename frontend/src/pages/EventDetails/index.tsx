import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Calendar, MapPin, Globe, Phone, Mail, ArrowLeft } from 'react-feather'

import api from '../../services/api'
import { EventTypeEnum, IEvent } from '../../types'
import dateFormater from '../../utils/dateFormater'

import './styles.scss'
import Header from '../../components/Header'

const EventDetails: React.FC = () => {
  const { id } = useParams() as { id: string }

  const [event, setEvent] = useState<IEvent>()

  useEffect(() => {
    ;(async () => {
      const response = await api.get(`events/${id}`)
      const eventResponse = response.data as IEvent

      const event = {
        ...eventResponse,
        date: new Date(eventResponse.date),
      }

      setEvent(event)
    })()
  }, [id])

  if (!event) {
    return (
      <div className="page event-details-page">
        <Header
          title="Detalhes do Evento"
          leftLink={{ to: '/', label: 'Voltar', icon: <ArrowLeft /> }}
        />

        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="page event-details-page">
      <Header
        title="Detalhes do Evento"
        leftLink={{ to: '/', label: 'Voltar', icon: <ArrowLeft /> }}
      />

      <div className="event-details">
        <h2>{event.title}</h2>

        <div className="date">
          <Calendar />
          <small>
            {dateFormater(event.date)} -{' '}
            {event.type === EventTypeEnum.HYBRID
              ? 'Híbrido'
              : event.type === EventTypeEnum.ONLINE
              ? 'Online'
              : 'Presencial'}
          </small>
        </div>

        <div className="description">
          {event.description.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <hr />

        <address>
          <div className="contact email">
            <Mail />
            <small>
              <a href={`mailto:${event.email}`}>{event.email}</a>
            </small>
          </div>

          <div className="contact phone">
            <Phone />
            <small>
              <a href={`tel:${event.phone}`}>{event.phone}</a>
            </small>
          </div>

          {(event.type === EventTypeEnum.PRESENTIAL ||
            event.type === EventTypeEnum.HYBRID) && (
            <div className="contact local">
              <MapPin />
              <small>
                {event.physicalAddress?.address} - {event.physicalAddress?.city}{' '}
                - {event.physicalAddress?.state}
              </small>
            </div>
          )}

          {(event.type === EventTypeEnum.ONLINE ||
            event.type === EventTypeEnum.HYBRID) && (
            <div className="contact link">
              <Globe />
              <small>
                <a href={event.onlineAddress || ''}>{event.onlineAddress}</a>
              </small>
            </div>
          )}
        </address>
      </div>
    </div>
  )
}

export default EventDetails
