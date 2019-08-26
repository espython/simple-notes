import React, { Component } from 'react'

class AddNotes extends Component {
  render () {
    return (
      <div className='card bg-dark p-3 text-light'>
        <form onSubmit={e => this.onSubmit(e, data)}>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Title: </label>
            <input
              type='text'
              className='form-control'
              id='mainInput'
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='exampleFormControlTextarea1'>Note Body: </label>
            <textarea className='form-control' id='exampleFormControlTextarea1' rows='3' />
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
