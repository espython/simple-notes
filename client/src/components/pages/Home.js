import React, { Component } from 'react'
import axios from 'axios'
import { AppContext } from '../../ContextProvider'
import AddNotes from '../layout/AddNotes'
import NoteBody from '../layout/NoteBody'

class Home extends Component {
  /**
   * custom variables and Methods
   */
  static contextType = AppContext
  state ={
    notes: null
  }

  componentDidMount () {
    const { context, getHomeNotes } = this
    getHomeNotes(context)
  }

/**
 * Custom Methods
 */
getHomeNotes = async (context) => {
  try {
    const notesResponse = await axios.get(`/api/notes`)
    const { data, status } = notesResponse
    const notes = data.reverse()
    console.log('notes', { data, status })
    console.log('context', context)
    context.setNotes(notes)
  } catch (error) {
    console.log('home page', error)
  }
};

render () {
  const { state, context } = this
  const { userData, notes } = context.state

  console.log('userNotes ==> ', notes)

  return (
    <div>
      <AddNotes />
      <div className='container  py-5'>
        <div className='row d-flex justify-content-center'>
          {notes
            ? notes.map((note, i) => (
              <div className='col-lg-4'>
                <NoteBody note={note} i={i} key={i} />
              </div>

            ))
            : null}
        </div>

      </div>

    </div>
  )
}
}

export default Home
