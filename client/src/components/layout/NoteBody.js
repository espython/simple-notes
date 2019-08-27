import React, { Component } from 'react'
import { AppContext } from '../../ContextProvider'
import { deleteNote } from '../../utils/ApiReq'

export default class NoteBody extends Component {
  /**
   * custom methods and handle state
   */
  static contextType = AppContext
  // handle delete note
  onSubmit = (e) => {
    const { context, props } = this

    e.preventDefault()
    const { note, i } = props

    deleteNote(note, context, i).then(res => {
      console.log('Delete Notes Response ==> ', res)
      const notes = context.state.notes
      console.log('notes 2 ==> ', notes)
      notes.pop(res)
      context.setNotes(notes)
    })
  }
  render () {
    const { context } = this
    const { note, i } = this.props
    console.log('Note Title ==> ', note)
    return (

      <div className='card  border-dark  mb-3' style={{ 'maxWidth': '18rem' }}>
        <h4 className='card-header'>{note.title}</h4>
        <div className='card-body'>

          <p className='card-text'>{note.body}</p>
        </div>
        <div className='card-footer bg-transparent border-dark d-inline-flex justify-content-between'>
          <a href='#' className='btn btn-dark' >Edit</a>
          <a href='#' className='btn btn-dark' onClick={e => this.onSubmit(e)}>Delete</a>
        </div>
      </div>

    )
  }
}
