import express from 'express'

const router = express.Router()

// index
router.get('/events', (req, res) => res.json({ msg: 'List all events' }))

// create
router.post('/events', (req, res) => res.json({ msg: 'Create an event' }))

// show
router.get('/events/:id', (req, res) => res.json({ msg: 'Show an event' }))

// update
router.patch('/events/:id', (req, res) => res.json({ msg: 'Update an event' }))

// delete
router.delete('/events/:id', (req, res) => res.json({ msg: 'Delete an event' }))

export default router
