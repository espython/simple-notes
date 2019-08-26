import Validator from 'validator'
import isEmpty from 'is-empty'

function validateNoteInput (data) {
  const errors = {}
  /**
     * convert empty fields to an empty string so we can use validator
     */
  data.title = !isEmpty(data.title) ? data.title : ''
  data.body = !isEmpty(data.body) ? data.body : ''
  data.author = !isEmpty(data.author) ? data.author : ''

  // check empty fields
  if (Validator.isEmpty(data.title)) {
    errors.noteTitle = 'Note title  field is Required'
  }

  if (Validator.isEmpty(data.body)) {
    errors.noteTitle = 'Note body  field is Required'
  }

  if (Validator.isEmpty(data.author)) {
    errors.noteTitle = 'Note author  field is Required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateNoteInput
