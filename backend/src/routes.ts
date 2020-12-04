import express from 'express'
import EventController from './controllers/EventController'

const router = express.Router()

// index
router.get('/events', EventController.index)

// create
router.post('/events', EventController.create)

// show
router.get('/events/:id', EventController.show)

// update
router.patch('/events/:id', EventController.update)

// delete
router.delete('/events/:id', EventController.delete)

export default router
