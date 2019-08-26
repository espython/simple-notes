import React, { Component } from 'react'
import { AppContext } from '../../ContextProvider'
import { createNotes } from '../../utils/ApiReq'

class AddNotes extends Component {
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
    const { context, state } = this

    e.preventDefault()
    // create the notes
    const userId = context.state.userData.id
    const noteData = { title: state.noteTitle, body: state.noteBody, author: userId }
    createNotes(noteData, context).then(res => {
      console.log('Create Notes Response ==> ', res)
      const notes = []
      notes.push(res)
      context.setNotes(notes)
    })
    e.target.reset()
  }

  render () {
    return (
      <div className='card bg-dark p-3 text-light'>
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
              Add Post
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddNotes
