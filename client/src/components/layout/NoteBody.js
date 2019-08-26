import React, { Component } from 'react'

export default class NoteBody extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { note, i } = this.props
    console.log('Note Title ==> ', note)
    return (

      <div className='card text-white bg-dark mb-3' style={{ 'maxWidth': '18rem' }}>
        <h4 className='card-header'>{note.title}</h4>
        <div className='card-body'>

          <p className='card-text'>{note.body}</p>
        </div>
      </div>

    )
  }
}
