import mongoose, { Document } from 'mongoose'

enum EventType {
  PRESENTIAL = 'PRESENTIAL',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

export interface IEventSchema extends Document {
  title: string
  description: string
  date: Date
  email: string
  phone: string
  type: EventType
  onlineAddress?: string
  physicalAddress?: { state: string; city: string; address: string }
}

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['PRESENTIAL', 'ONLINE', 'HYBRID'],
  },
  onlineAddress: {
    type: String,
    required: false,
  },
  physicalAddress: {
    type: {
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    required: false,
  },
})

export default mongoose.model<IEventSchema>('Event', EventSchema)
