import React, { useEffect, useRef, useState } from 'react'

import Input, { Select, TextArea } from '../Input'

import { EventTypeEnum, ICreateEvent, IEvent } from '../../types'
import parseDate from '../../utils/parseDate'
import { getDate, getHour } from '../../utils/dateFormater'

import './styles.scss'
import api from '../../services/api'

interface EventFormProps {
  event?: IEvent
  buttonText: string
  submitFunction: (data: ICreateEvent) => void
}

interface UF {
  sigla: string
  nome: string
}

interface IBGECityResponse {
  nome: string
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  buttonText,
  submitFunction,
}) => {
  const [eventType, setEventType] = useState<EventTypeEnum>(
    EventTypeEnum.ONLINE
  )
  const [UFs, setUFs] = useState<UF[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')

  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(document.createElement('input'))
  const dateRef = useRef<HTMLInputElement>(document.createElement('input'))
  const hourRef = useRef<HTMLInputElement>(document.createElement('input'))
  const emailRef = useRef<HTMLInputElement>(document.createElement('input'))
  const phoneRef = useRef<HTMLInputElement>(document.createElement('input'))
  const descriptionRef = useRef<HTMLTextAreaElement>(
    document.createElement('textarea')
  )
  const urlRef = useRef<HTMLInputElement>(document.createElement('input'))
  const addressRef = useRef<HTMLInputElement>(document.createElement('input'))
  const stateRef = useRef<HTMLSelectElement>(document.createElement('select'))
  const cityRef = useRef<HTMLSelectElement>(document.createElement('select'))

  useEffect(() => {
    if (event) {
      titleRef.current.value = event.title
      dateRef.current.value = getDate(event.date)
      hourRef.current.value = getHour(event.date)
      emailRef.current.value = event.email
      phoneRef.current.value = event.phone
      descriptionRef.current.value = event.description
      setEventType(event.type)

      if (
        event.type === EventTypeEnum.HYBRID ||
        event.type === EventTypeEnum.ONLINE
      ) {
        urlRef.current.value = event.onlineAddress as string
      }

      if (
        event.type === EventTypeEnum.HYBRID ||
        event.type === EventTypeEnum.PRESENTIAL
      ) {
        const addr = event.physicalAddress as {
          address: string
          city: string
          state: string
        }

        addressRef.current.value = addr.address
        setSelectedUf(addr.state)

        setTimeout(() => {
          stateRef.current.value = addr.state
          cityRef.current.value = addr.city
        }, 200)
      }
    }
  }, [event])

  // get UFs
  useEffect(() => {
    api
      .get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufs = response.data
          .map((uf: UF) => {
            return {
              sigla: uf.sigla,
              nome: uf.nome,
            }
          })
          .sort((a, b) => {
            return a.nome.toUpperCase() > b.nome.toUpperCase()
              ? 1
              : a.nome.toUpperCase() < b.nome.toUpperCase()
              ? -1
              : 0
          })

        setUFs(ufs)
      })
  }, [])

  // get Cities
  useEffect(() => {
    if (selectedUf === '0') {
      setCities([])
      return
    }

    api
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome).sort()

        setCities(cityNames)
      })
  }, [selectedUf])

  const handleVerifyInputs = (): boolean => {
    let hasErrors = false

    if (!titleRef.current.value) {
      titleRef.current.setCustomValidity('Insira um título')
      hasErrors = true
    }

    if (!dateRef.current.value) {
      dateRef.current.setCustomValidity('Insira uma data')
      hasErrors = true
    }

    if (!hourRef.current.value) {
      hourRef.current.setCustomValidity('Insira um horário')
      hasErrors = true
    }

    if (!emailRef.current.value) {
      emailRef.current.setCustomValidity('Insira um email')
      hasErrors = true
    }

    if (!phoneRef.current.value) {
      phoneRef.current.setCustomValidity('Insira um telefone')
      hasErrors = true
    }

    if (!descriptionRef.current.value) {
      descriptionRef.current.setCustomValidity('Insira uma descrição')
      hasErrors = true
    }

    if (
      (eventType === EventTypeEnum.HYBRID ||
        eventType === EventTypeEnum.ONLINE) &&
      !urlRef.current.value
    ) {
      urlRef.current.setCustomValidity('Insira uma URL')
      hasErrors = true
    }

    if (
      eventType === EventTypeEnum.HYBRID ||
      eventType === EventTypeEnum.PRESENTIAL
    ) {
      if (!addressRef.current.value) {
        addressRef.current.setCustomValidity('Insira uma URL')
        hasErrors = true
      }

      if (stateRef.current.value === '0') {
        stateRef.current.setCustomValidity('Selecione um estado')
        hasErrors = true
      }

      if (cityRef.current.value === '0') {
        cityRef.current.setCustomValidity('Selecione uma cidade')
        hasErrors = true
      }
    }

    return hasErrors
  }

  const handleFormatData = (): ICreateEvent => {
    return {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: parseDate(dateRef.current.value, hourRef.current.value),
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      type: eventType,
      onlineAddress:
        eventType === EventTypeEnum.HYBRID || eventType === EventTypeEnum.ONLINE
          ? urlRef.current.value
          : '',
      physicalAddress: {
        address:
          eventType === EventTypeEnum.HYBRID ||
          eventType === EventTypeEnum.PRESENTIAL
            ? addressRef.current.value
            : '',
        city:
          eventType === EventTypeEnum.HYBRID ||
          eventType === EventTypeEnum.PRESENTIAL
            ? cityRef.current.value
            : '',
        state:
          eventType === EventTypeEnum.HYBRID ||
          eventType === EventTypeEnum.PRESENTIAL
            ? stateRef.current.value
            : '',
      },
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleVerifyInputs()) return

    const data = handleFormatData()

    submitFunction(data)
  }

  return (
    <div className="form-container">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <Input
            label="Título"
            placeholder="Digite o nome do evento"
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
              span={'"xx/xx/xxxx"'}
              maxLength={10}
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
              span={'"xx:xx"'}
              maxLength={5}
              inputMode="numeric"
              onKeyUp={e =>
                !e.currentTarget.value ||
                !/[012]\d:[0-5]\d/.test(e.currentTarget.value)
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
            onKeyUp={e =>
              !e.currentTarget.value
                ? e.currentTarget.setCustomValidity('Insira um telefone válido')
                : e.currentTarget.setCustomValidity('')
            }
            ref={emailRef}
          />
          <Input
            label="Telefone"
            span={'"(xx) xxxx-xxxx"'}
            maxLength={14}
            type="tel"
            inputMode="tel"
            placeholder="Entre com um telefone para contato"
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

        <Input
          shouldHide={
            !(
              eventType === EventTypeEnum.ONLINE ||
              eventType === EventTypeEnum.HYBRID
            )
          }
          label="URL do evento"
          span="(Informar http:// ou https://)"
          placeholder="Informe o site que o evento ocorrerá"
          type="url"
          inputMode="url"
          ref={urlRef}
        />

        <div className="row">
          <Input
            shouldHide={
              !(
                eventType === EventTypeEnum.PRESENTIAL ||
                eventType === EventTypeEnum.HYBRID
              )
            }
            label="Endereço"
            placeholder="Informe o local do evento"
            onKeyUp={e =>
              !e.currentTarget.value
                ? e.currentTarget.setCustomValidity('Insira um endereço')
                : e.currentTarget.setCustomValidity('')
            }
            ref={addressRef}
          />

          <div className="row">
            <Select
              shouldHide={
                !(
                  eventType === EventTypeEnum.PRESENTIAL ||
                  eventType === EventTypeEnum.HYBRID
                )
              }
              ref={stateRef}
              label="Estado"
              placeholder="Selecione"
              options={UFs.map(uf => ({ label: uf.nome, value: uf.sigla }))}
              onChange={e => {
                setSelectedUf(e.target.value)
                e.target.setCustomValidity('')
              }}
            />

            <Select
              shouldHide={
                !(
                  eventType === EventTypeEnum.PRESENTIAL ||
                  eventType === EventTypeEnum.HYBRID
                )
              }
              ref={cityRef}
              label="Cidade"
              placeholder="Selecione"
              options={cities.map(city => ({ label: city, value: city }))}
              onChange={e => {
                e.target.setCustomValidity('')
              }}
            />
          </div>
        </div>

        <button type="submit">{buttonText}</button>
      </form>
    </div>
  )
}

export default EventForm
