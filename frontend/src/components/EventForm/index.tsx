import React, { useRef, useState } from 'react'
import { EventTypeEnum } from '../../types'

import Input, { TextArea } from '../Input'

import './styles.scss'

const EventForm: React.FC = () => {
  const [eventType, setEventType] = useState<EventTypeEnum>(
    EventTypeEnum.ONLINE
  )

  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)

  const handleVerifyInputs = (): boolean => {
    let hasErrors = false

    if (!titleRef.current?.value) {
      titleRef.current?.setCustomValidity('Insira um título')
      hasErrors = true
    }

    if (!dateRef.current?.value) {
      dateRef.current?.setCustomValidity('Insira uma data')
      hasErrors = true
    }

    if (!hourRef.current?.value) {
      hourRef.current?.setCustomValidity('Insira um horário')
      hasErrors = true
    }

    if (!emailRef.current?.value) {
      emailRef.current?.setCustomValidity('Insira um email')
      hasErrors = true
    }

    if (!phoneRef.current?.value) {
      phoneRef.current?.setCustomValidity('Insira um telefone')
      hasErrors = true
    }

    if (!descriptionRef.current?.value) {
      descriptionRef.current?.setCustomValidity('Insira uma descrição')
      hasErrors = true
    }

    if (
      (eventType === EventTypeEnum.HYBRID ||
        eventType === EventTypeEnum.ONLINE) &&
      !urlRef.current?.value
    ) {
      urlRef.current?.setCustomValidity('Insira uma URL')
      hasErrors = true
    }

    if (
      (eventType === EventTypeEnum.HYBRID ||
        eventType === EventTypeEnum.PRESENTIAL) &&
      !addressRef.current?.value
    ) {
      addressRef.current?.setCustomValidity('Insira uma URL')
      hasErrors = true
    }

    return hasErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!handleVerifyInputs()) return
  }

  return (
    <div className="form-container">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <Input
            label="Título"
            placeholder="Digite o nome do evento"
            mask=""
            maxLength={50}
            onKeyUp={e =>
              e.currentTarget.value.length < 5
                ? e.currentTarget.setCustomValidity('Insira um título maior')
                : e.currentTarget.setCustomValidity('')
            }
            ref={titleRef}
          />
          <div className="row">
            <Input
              label="Data"
              placeholder="Informe a data"
              mask="99/99/9999"
              inputMode="numeric"
              onKeyUp={e =>
                !e.currentTarget.value ||
                !/[0-3]\d\/[0-1]\d\/\d\d\d\d/.test(e.currentTarget.value)
                  ? e.currentTarget.setCustomValidity('Insira uma data válida')
                  : e.currentTarget.setCustomValidity('')
              }
              ref={dateRef}
            />
            <Input
              label="Horário"
              placeholder="Informe o horário"
              mask="99:99"
              inputMode="numeric"
              onKeyUp={e =>
                !e.currentTarget.value ||
                !/[01]\d:[0-5]\d/.test(e.currentTarget.value)
                  ? e.currentTarget.setCustomValidity(
                      'Insira um horário válido'
                    )
                  : e.currentTarget.setCustomValidity('')
              }
              ref={hourRef}
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
            ref={emailRef}
          />
          <Input
            label="Telefone"
            type="tel"
            inputMode="tel"
            placeholder="Entre com um telefone para contato"
            mask="(99) 9999-9999"
            onKeyUp={e =>
              !e.currentTarget.value ||
              !/\(\d\d\) \d\d\d\d-\d\d\d\d/.test(e.currentTarget.value)
                ? e.currentTarget.setCustomValidity('Insira um telefone válido')
                : e.currentTarget.setCustomValidity('')
            }
            ref={phoneRef}
          />
        </div>

        <TextArea
          label="Descrição"
          span="(Mínimo 20 caracteres)"
          placeholder="Descreva o seu evento"
          ref={descriptionRef}
          onKeyUp={e =>
            e.currentTarget.value.length < 20
              ? e.currentTarget.setCustomValidity('Insira uma descrição maior')
              : e.currentTarget.setCustomValidity('')
          }
        />

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
            span="(Informar http:// ou https://)"
            placeholder="Informe o site que o evento ocorrerá"
            mask=""
            type="url"
            inputMode="url"
            ref={urlRef}
          />
        )}

        {(eventType === EventTypeEnum.PRESENTIAL ||
          eventType === EventTypeEnum.HYBRID) && (
          <Input
            label="Endereço"
            span={'(No formato "endereço - cidade - estado")'}
            placeholder="Informe o local do evento"
            mask=""
            onKeyUp={e =>
              !e.currentTarget.value ||
              !/.+ - .+ - .+/.test(e.currentTarget.value)
                ? e.currentTarget.setCustomValidity(
                    'Insira um endereço comforme o padrão descrito'
                  )
                : e.currentTarget.setCustomValidity('')
            }
            ref={addressRef}
          />
        )}

        <button type="submit">Criar Evento</button>
      </form>
    </div>
  )
}

export default EventForm
