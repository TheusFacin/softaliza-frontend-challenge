import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar } from 'react-feather'

import api from '../../services/api'
import dateFormater from '../../utils/dateFormater'

import { IEvent, EventTypeEnum } from '../../types'

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
        <h1>Eventos</h1>

        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="page events-page">
      <h1>Eventos</h1>

      <div className="events-list">
        {events.length === 0 ? (
          <p>Não há nenhum evento disponível no momento...</p>
        ) : (
          events.map(event => (
            <div className="event" key={event._id}>
              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <footer>
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

                <Link to={`/event/${event._id}`} className="button">
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
