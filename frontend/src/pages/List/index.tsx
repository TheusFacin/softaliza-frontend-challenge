import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Plus } from 'react-feather'

import api from '../../services/api'
import dateFormater from '../../utils/dateFormater'

import { IEvent, EventTypeEnum } from '../../types'

import './styles.scss'
import Header from '../../components/Header'

const List: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>()

  useEffect(() => {
    ;(async () => {
      const response = await api.get('/events')
      const eventsResponse = response.data as IEvent[]

      const events = eventsResponse.map(event => {
        const dateObject = new Date(event.date)

        return {
          ...event,
          date: dateObject,
        }
      })

      setEvents(events)
    })()
  }, [])

  if (!events) {
    return (
      <div className="page events-page">
        <Header
          title="Eventos Disponíveis"
          rightLink={{
            to: '/create',
            label: 'Criar Evento',
            icon: <Plus />,
          }}
        />

        <div className="events-list">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page events-page">
      <Header
        title="Eventos Disponíveis"
        rightLink={{ to: '/create', label: 'Criar Evento', icon: <Plus /> }}
      />

      <div className="events-list">
        {events.length === 0 ? (
          <p>Não há nenhum evento disponível no momento...</p>
        ) : (
          events.map(event => (
            <div className="event" key={event._id}>
              <h2>{event.title}</h2>

              <div className="description">
                <p>{event.description.split(/\n/)[0]}</p>
                {event.description.split('\n').length > 1 && <p>...</p>}
              </div>

              <hr />

              <footer>
                <div className="details">
                  <div className="date">
                    <Calendar />
                    <small>{dateFormater(event.date)}</small>
                  </div>

                  <div className="local">
                    <MapPin />
                    {event.type === EventTypeEnum.ONLINE ? (
                      <small>Online</small>
                    ) : event.type === EventTypeEnum.PRESENTIAL ? (
                      <small>
                        {event.physicalAddress?.city} -{' '}
                        {event.physicalAddress?.state}
                      </small>
                    ) : (
                      <small>
                        Online | {event.physicalAddress?.city} -{' '}
                        {event.physicalAddress?.state}
                      </small>
                    )}
                  </div>
                </div>

                <Link to={`/event/${event._id}`}>
                  <button>
                    Saiba mais <ArrowRight />
                  </button>
                </Link>
              </footer>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List
