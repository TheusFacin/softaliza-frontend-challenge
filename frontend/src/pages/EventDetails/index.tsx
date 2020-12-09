import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  ArrowLeft,
  Edit2,
  Trash2,
} from 'react-feather'
import Leaflet from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

import Header from '../../components/Header'

import { EventTypeEnum, IEvent } from '../../types'
import api from '../../services/api'
import dateFormater from '../../utils/dateFormater'
import mapMarkerImg from '../../assets/map-marker.svg'

import './styles.scss'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [38, 50],
  iconAnchor: [19, 50],
})

const provider = new OpenStreetMapProvider()

interface Address {
  label: string
  x: string
  y: string
}

const EventDetails: React.FC = () => {
  const { id } = useParams() as { id: string }
  const history = useHistory()

  const [event, setEvent] = useState<IEvent>()
  const [address, setAddress] = useState<Address>()

  useEffect(() => {
    ;(async () => {
      const response = await api.get(`events/${id}`)
      const eventResponse = response.data as IEvent

      const event = {
        ...eventResponse,
        date: new Date(eventResponse.date),
      }

      setEvent(event)

      if (event.type !== EventTypeEnum.ONLINE) {
        const results = (await provider.search({
          query: `${event.physicalAddress?.address} - ${event.physicalAddress?.city} - ${event.physicalAddress?.state}`,
        })) as Address[]

        console.log(results)

        if (results[0]) {
          setAddress(results[0] as Address)
        } else {
          setAddress({ label: '', x: '0', y: '0' })
        }
      }
    })()
  }, [id])

  const handleRemoveEvent = async () => {
    const response = window.confirm(
      'Tem certeza que deseja excluir o evento?\nEssa ação não pode ser desfeita'
    )

    if (response) {
      try {
        await api.delete(`/events/${id}`)

        alert('Evento excluido com sucesso')

        history.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (!event || (!address && event.type !== EventTypeEnum.ONLINE)) {
    return (
      <div className="page event-details-page">
        <Header
          title="Detalhes do Evento"
          leftLink={{ to: '/', label: 'Voltar', icon: <ArrowLeft /> }}
        />

        <div className="event-details">
          <p>Carregando...</p>
        </div>
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

        <div className="options">
          <Link to={`/event/${id}/edit`}>
            <button className="edit">
              <Edit2 />
            </button>
          </Link>

          <button onClick={handleRemoveEvent} className="remove">
            <Trash2 />
          </button>
        </div>

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

          {event.type !== EventTypeEnum.ONLINE && address && (
            <div className="contact local">
              <MapPin />
              <small>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${address.y},${address.x}`}
                >
                  {event.physicalAddress?.address} -{' '}
                  {event.physicalAddress?.city} - {event.physicalAddress?.state}
                </a>
              </small>
            </div>
          )}

          {event.type !== EventTypeEnum.PRESENTIAL && (
            <div className="contact link">
              <Globe />
              <small>
                <a target="_blank" href={event.onlineAddress || ''}>
                  {event.onlineAddress}
                </a>
              </small>
            </div>
          )}
        </address>

        {event.type !== EventTypeEnum.ONLINE && address && (
          <div id="map">
            <MapContainer
              center={[Number(address.y), Number(address.x)]}
              zoom={16}
              style={{ width: '100%', height: '100%' }}
              dragging={false}
              touchZoom={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <Marker
                icon={mapIcon}
                position={[Number(address.y), Number(address.x)]}
              />
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails
