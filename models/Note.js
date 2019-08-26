import mongoose from 'mongoose'

/**
 * Initialize the post schema
 */
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Note = mongoose.model('notes', noteSchema)

export default Note
