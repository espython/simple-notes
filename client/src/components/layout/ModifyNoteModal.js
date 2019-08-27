import React, { Component } from 'react'
import axios from 'axios'
import { AppContext } from '../../ContextProvider'
import { updateNote } from '../../utils/ApiReq'

export default class ModifyNoteModal extends Component {
    static contextType = AppContext
    // Component state
    state = {
      noteTitle: null,
      noteBody: null
    }
    /**
     * onChange Method
     */
    onChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }
    /**
     * onSubmit Method
     */
    onSubmit = (e) => {
      e.preventDefault()
      const { context, state } = this
      const { note } = this.props
      const authorId = note.note.author
      const noteId = note.note._id
      console.log('noteFromUpdate ==>', note.note.author)
      // create the notes
      const noteData = { title: state.noteTitle, body: state.noteBody, author: authorId }
      updateNote(noteData, context, noteId).then(res => {
        console.log('Edit Note', noteData)
        context.setShow(false)
        this.getHomeNotes(context)
        context.setIsUpdated(true)
      })
      e.target.reset()
    }

    getHomeNotes = async (context) => {
      try {
        const notesResponse = await axios.get(`/api/notes`)
        const { data } = notesResponse
        let notes = data.reverse()
        console.log('Home-notes', notes)

        notes = context.setNotes(notes)
        this.setState({ notes })
        console.log('context', context)
      } catch (error) {
        console.log('home page', error)
      }
    };

    render () {
      const { context } = this
      console.log('Show', context.state.show)
      if (!context.state.show) {
        return null
      }
      return (
        <div className='card border-dark  mb-3 p-3'>
          <form onSubmit={e => this.onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Title: </label>
              <input
                type='text'
                className='form-control'
                id='noteTitle'
                onChange={e => this.onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='exampleFormControlTextarea1'>Note Body: </label>
              <textarea
                className='form-control' id='noteBody' rows='3' onChange={e => this.onChange(e)} />
            </div>

            <div className='d-flex flex-row-reverse'>
              <button className='btn btn-dark' type='submit'>
                            Edit Note
              </button>

            </div>
          </form>
        </div>
      )
    }
}
