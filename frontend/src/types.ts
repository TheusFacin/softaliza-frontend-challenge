export enum EventTypeEnum {
  PRESENTIAL = 'PRESENTIAL',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

export interface IEvent {
  _id: string
  title: string
  description: string
  date: Date
  email: string
  phone: string
  type: EventTypeEnum
  onlineAddress: string | null
  physicalAddress: {
    state: string
    city: string
    address: string
  } | null
}
