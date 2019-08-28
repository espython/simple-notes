import React, { Component } from 'react'

export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

class ContextProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      errors: null,
      show: false,
      userData: null,
      notes: [],
      note: null,
      usernotes: null,
      isUpdated: false
    }
  }

  render () {
    const { children } = this.props
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setNote: note => this.setState({ note }),
          setShow: show => this.setState({ show }),
          setError: error => this.setState({ errors: error }),
          setUserData: userData => this.setState({ userData }),
          setAuth: isAuth => this.setState({ isAuthenticated: isAuth }),
          setNotes: notes => {
            this.setState({ notes: notes })
          },
          setProfileNotes: userNotes => this.setState({ userNotes }),
          setIsUpdated: isUpdated => this.setState({ isUpdated })
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default ContextProvider
