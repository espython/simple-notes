import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

import '../../styles/bootstrap.min.css'
import '../../styles/layout.css'

export default function Layout ({ children }) {
  return (
    <div className='main-body container'>
      <Header className='main-header' />
      <div className='main-component'>{children}</div>
      <Footer className='main-footer' />
    </div>
  )
}
