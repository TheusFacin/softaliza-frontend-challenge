import mongoose from 'mongoose'

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

export default mongoose.model('Event', EventSchema)
