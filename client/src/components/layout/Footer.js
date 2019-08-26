import React from 'react'

export default function Footer () {
  return (
    <footer className='footer py-3'>
      <div className='container '>
        <div className='row'>
          <div className='col-10 mx-auto col-md-6 text-center text-capitalize'>
            <h5>
            All right reserved &copy;{new Date().getFullYear().toString()}
            </h5>
            <h6>Developed by esPython</h6>
          </div>
        </div>
      </div>
    </footer>
  )
}
