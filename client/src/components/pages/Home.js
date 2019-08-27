import React, { Component } from 'react'
import axios from 'axios'
import { AppContext } from '../../ContextProvider'
import AddNotes from '../layout/AddNotes'
import NoteBody from '../layout/NoteBody'
import ModifyNoteModal from '../layout/ModifyNoteModal'

class Home extends Component {
  /**
   * custom variables and Methods
   */
  static contextType = AppContext
  state ={
    notes: null,
    updated: false
  }

  componentDidMount () {
    const { context, getHomeNotes } = this

    // if (context.state.isUpdated) {
    //   this.setState({ updated: context.state.isUpdated })
    //   getHomeNotes(context)
    // }
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
  const { notes, isUpdated } = context.state

  // if (isUpdated) {
  //   this.setState({ updated: isUpdated })
  // }

  console.log('userNotes ==> ', notes)

  return (
    <div>
      <AddNotes />
      <div className='container  py-5'>
        <div className='row d-flex justify-content-start'>
          {notes
            ? notes.map((note, i) => (
              <div className='col-lg-4 col-md-6 mt-5 ' key={i}>
                <NoteBody note={note} i={i} />
              </div>

            ))
            : null}
        </div>

      </div>

      <ModifyNoteModal show={context.state.show} note={context.state.note} />

    </div>
  )
}
}

export default Home
