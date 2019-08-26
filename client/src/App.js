import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ContextProvider, { AppConsumer } from './ContextProvider'

import PrivateRoute from './components/routes/PrivateRoute'
import { Home, LandingPage, Login, SignUp, Profile, NotFound } from './components/pages'

export default function App () {
  return (
    <ContextProvider>
      <Router>
        <Layout className='App'>
          <Fragment>
            <Switch>
              <Route path='/' exact render={props => <LandingPage {...props} />} />

              <Route path='/login' render={props => <Login {...props} />} />

              <Route path='/signup' render={props => <SignUp {...props} />} />

              <PrivateRoute path='/home' exact component={Home} />
              <PrivateRoute path='/profile' exact component={Profile} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Fragment>
        </Layout>
      </Router>
    </ContextProvider>

  )
}
