import { Request, Response } from 'express'
import Event, { IEventSchema } from '../models/Event'

interface ICreateRequest {
  title: IEventSchema['title']
  description: IEventSchema['description']
  date: IEventSchema['date']
  email: IEventSchema['email']
  phone: IEventSchema['phone']
  type: IEventSchema['type']
  onlineAddress?: IEventSchema['onlineAddress']
  physicalAddress?: IEventSchema['physicalAddress']
}

interface IUpdateRequest {
  title?: IEventSchema['title']
  description?: IEventSchema['description']
  date?: IEventSchema['date']
  email?: IEventSchema['email']
  phone?: IEventSchema['phone']
  type?: IEventSchema['type']
  onlineAddress?: IEventSchema['onlineAddress']
  physicalAddress?: IEventSchema['physicalAddress']
}

class EventController {
  async index(req: Request, res: Response) {
    const events = await Event.find()

    return res.json(events)
  }

  async create(req: Request, res: Response) {
    const {
      title,
      date,
      description,
      email,
      phone,
      type,
      onlineAddress,
      physicalAddress,
    } = req.body as ICreateRequest

    if (!title || !date || !description || !email || !phone || !type) {
      return res.status(400).json({
        err: 'Please, provide every information',
      })
    }

    if (!(type === 'ONLINE' || type === 'PRESENTIAL' || type === 'HYBRID')) {
      return res.status(400).json({
        err: 'Invalid event type',
      })
    }

    if ((type === 'ONLINE' || type === 'HYBRID') && !onlineAddress) {
      return res.status(400).json({
        err: 'Every online event should have an online address',
      })
    }

    if (
      (type === 'PRESENTIAL' || type === 'HYBRID') &&
      (!physicalAddress?.state ||
        !physicalAddress?.city ||
        !physicalAddress.address)
    ) {
      return res.status(400).json({
        err: 'Every presential event should have an address',
      })
    }

    const event = await Event.create({
      title,
      date: new Date(date),
      description,
      email,
      phone,
      type,
      onlineAddress,
      physicalAddress,
    } as ICreateRequest)

    return res.status(201).json(event)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    try {
      const event = await Event.findById(id)

      return res.json(event)
    } catch {
      return res.status(404)
    }
  }

  async update(req: Request, res: Response) {
    const {
      title,
      date,
      description,
      email,
      phone,
      type,
      onlineAddress,
      physicalAddress,
    } = req.body as IUpdateRequest

    const { id } = req.params

    if (
      type &&
      !(type === 'ONLINE' || type === 'PRESENTIAL' || type === 'HYBRID')
    ) {
      return res.status(400).json({
        err: 'Invalid event type',
      })
    }

    if ((type === 'ONLINE' || type === 'HYBRID') && !onlineAddress) {
      return res.status(400).json({
        err: 'Every online event should have an online address',
      })
    }

    if (
      (type === 'PRESENTIAL' || type === 'HYBRID') &&
      (!physicalAddress?.state ||
        !physicalAddress?.city ||
        !physicalAddress.address)
    ) {
      return res.status(400).json({
        err: 'Every presential event should have an address',
      })
    }

    const newEvent = {
      title,
      date: date ? new Date(date) : undefined,
      description,
      email,
      phone,
      type,
      onlineAddress,
      physicalAddress,
    }

    // removing undefined keys of new event object
    Object.keys(newEvent).forEach(
      (key: string) =>
        newEvent[key as keyof IUpdateRequest] === undefined &&
        delete newEvent[key as keyof IUpdateRequest]
    )

    const event = await Event.findByIdAndUpdate(id, newEvent)

    return res.status(201).json(event)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const event = await Event.findByIdAndDelete(id)

    return res.json(event)
  }
}

export default new EventController()
