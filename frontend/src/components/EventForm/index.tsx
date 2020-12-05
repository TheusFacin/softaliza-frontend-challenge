import React, { useState } from 'react'
import { EventTypeEnum } from '../../types'

import Input, { TextArea } from '../Input'

import './styles.scss'

const EventForm: React.FC = () => {
  const [eventType, setEventType] = useState<EventTypeEnum>()

  return (
    <div className="form-container">
      <form>
        <div className="row">
          <Input label="Título" placeholder="Digite o nome do evento" mask="" />
          <div className="row">
            <Input
              label="Data"
              placeholder="Informe a data"
              mask="99/99/9999"
              inputMode="numeric"
            />
            <Input
              label="Horário"
              placeholder="Informe o horário"
              mask="99:99"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="row">
          <Input
            label="Email"
            type="email"
            inputMode="email"
            placeholder="Entre com um email para contato"
            mask=""
          />
          <Input
            label="Telefone"
            type="tel"
            inputMode="tel"
            placeholder="Entre com um telefone para contato"
            mask="(99) 9999-9999"
          />
        </div>

        <TextArea label="Descrição" placeholder="Descreva o seu evento" />

        <hr />

        <div className="event-type">
          <label>
            Tipo de evento<span>(Selecione uma opção)</span>
          </label>

          <div className="row three">
            <button
              className={`option ${
                eventType === EventTypeEnum.PRESENTIAL ? 'active' : ''
              }`}
              type="button"
              onClick={() => setEventType(EventTypeEnum.PRESENTIAL)}
            >
              Presencial
            </button>
            <button
              className={`option ${
                eventType === EventTypeEnum.ONLINE ? 'active' : ''
              }`}
              type="button"
              onClick={() => setEventType(EventTypeEnum.ONLINE)}
            >
              Online
            </button>
            <button
              className={`option ${
                eventType === EventTypeEnum.HYBRID ? 'active' : ''
              }`}
              type="button"
              onClick={() => setEventType(EventTypeEnum.HYBRID)}
            >
              Híbrido
            </button>
          </div>
        </div>

        {(eventType === EventTypeEnum.ONLINE ||
          eventType === EventTypeEnum.HYBRID) && (
          <Input
            label="URL do evento"
            placeholder="Informe o site que o evento ocorrerá"
            mask=""
            type="url"
            inputMode="url"
          />
        )}

        {(eventType === EventTypeEnum.PRESENTIAL ||
          eventType === EventTypeEnum.HYBRID) && (
          <Input
            label="Endereço"
            placeholder="Informe o local do evento"
            mask=""
          />
        )}

        <button type="submit">Criar Evento</button>
      </form>
    </div>
  )
}

export default EventForm
