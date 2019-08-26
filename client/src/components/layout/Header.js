import React, { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../ContextProvider'
import { logoutUser } from '../../utils/ApiReq'

export default function Header () {
  /**
   * Manage state & live cycle Method
   */
  const context = useContext(AppContext)

  return (
    <nav>
      <div className='container'>
        <div className='row nav-row '>
          <Link to='/' className='logo'>
            <h4>Simple Notes</h4>
          </Link>
          <Fragment>
            {context.state.isAuthenticated ? (
              <div className='d-flex flex-row align-items-center p-2'>
                <Link to='/home'>
                  <h5 className='mr-3'>Home</h5>
                </Link>
                <Link to='/profile'>
                  <h5>profile</h5>
                </Link>
                <Link to='/' onClick={e => logoutUser(context)}>
                  <h5 className='ml-3 logout-btn'>logout</h5>
                </Link>
              </div>
            ) : (
              <div className='menu-items'>
                <Link to='/login'>
                  <h6>Login</h6>
                </Link>
                <Link to='/signup'>
                  <h6>Signup</h6>
                </Link>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </nav>
  )
}
