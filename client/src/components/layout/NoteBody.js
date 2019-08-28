import React, { Component } from 'react'
import { AppContext } from '../../ContextProvider'
import { deleteNote } from '../../utils/ApiReq'

export default class NoteBody extends Component {
  /**
   * custom methods and handle state
   */
  static contextType = AppContext

  state = {
    show: false
  }
  // handle delete note
  onSubmit = (e) => {
    const { context, props } = this

    e.preventDefault()
    const { note, i } = props
    deleteNote(note, context, i).then(res => {
      console.log('Delete Notes Response ==> ', res)
      console.log('note Data3 ==>', note)
      let notes = context.state.notes
      console.log('notes 2 ==> ', notes)
      notes = notes.filter(function (item) {
        return item !== note
      })
      console.log('notes 3 ==> ', notes)
      context.setNotes(notes)
    })
  }
  /**
   * show Model Method
   */
  showModel = (e) => {
    const { context } = this
    const { note, i } = this.props
    context.setNote({ note })
    context.setShow(true)
  }

  /**
   * Render Method
   */
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
          <a href='#' className='btn btn-dark' onClick={e => this.showModel(e)}>Edit</a>
          <a href='#' className='btn btn-dark' onClick={e => this.onSubmit(e)}>Delete</a>
        </div>
      </div>

    )
  }
}
