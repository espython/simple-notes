import express from 'express'

import { Note } from '../models'

import { validateNoteInput } from '../validation'

const router = express.Router()

/**
 * Create the Note Route
 */
router.post('/note', (req, res) => {
  const { errors, isValid } = validateNoteInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  console.log('body', req.body)
  Note.create({ title: req.body.title, body: req.body.body, author: req.body.author }, function (error, note) {
    if (error) {
      return res.status(400).json({ note: 'error while saving your notes' })
    }
    console.log('Note Saved Successfully', note)
    res.json(note)
  })
  console.log('body', req.body)
})

/**
 * get posts route
 */
router.get('/notes/', (req, res) => {
  // console.log('id ==> ', id);
  try {
    const getNotes = async () => {
      const notesArray = await Note.find({})
      res.json(notesArray)
    }
    getNotes()

    // res.json({ posts });
    // console.log('posts', posts);
  } catch (error) {
    console.log('find posts Errors', error)
  }
})

/**
 * Delete Note
 */
router.delete('/note/:id/delete', (req, res) => {
  if (req.params.id) {
    console.log('ID', req.params.id)
    try {
      Note.findByIdAndRemove(req.params.id, (error, note) => {
        console.log('noteid', req.params.id)
        // As always, handle any potential errors:
        if (error) return res.status(500).send(error)

        return res.status(200).json(note)
      })
    } catch (error) {
      console.log('Erroe == > ', error)
    }
  }
})

export default router
