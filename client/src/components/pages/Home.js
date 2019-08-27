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
  const { notes } = context.state

  console.log('userNotes ==> ', notes)

  return (
    <div>
      <AddNotes />
      <div className='container  py-5'>
        <div className='row d-flex justify-content-center'>
          {notes
            ? notes.map((note, i) => (
              <div className='col-lg-4  mt-5 ' key={i}>
                <NoteBody note={note} i={i} />
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
