import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from './setAuthToken'

/**
 * Registartion post Request
 */
export const RegisterNewUser = (userData, history, context) => {
  axios
    .post('/api/users/signup', userData)
    .then(res => {
      context.setError(null)
      history.push('/login')
    }) // re-direct to login on successful register
    .catch(err => {
      console.log('ERR==>', err.response)
      context.setError(err)
    })
}

/**
 * Login Request
 */
export const setCurrentUser = (decoded, context) => {
  context.setAuth(true)
  context.setUserData(decoded)
}

// Login - get user token
export const loginUser = (userData, history, context) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data
      console.log('Response', token)
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwtDecode(token)

      // Set current user
      // context.setUserData(decoded);
      // context.setAuth(true);
      console.log('decoded', decoded)

      setCurrentUser(decoded, context)
      //
      history.push('/home')

      //
    })
    .catch(err => {
      console.log(err)
      context.setError(err.response.data)
    })
}

/**
 *
 * set auth token
 */

// Log user out
export const logoutUser = context => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  context.setAuth(false)
  // Set current user to empty object {} which will set isAuthenticated to false
  // setCurrentUser({});
}

/**
 * create notes and save them on database
 */
export const createNotes = async (noteData, context) => {
  try {
    const response = await axios.post('/api/note', noteData)
    const { data } = response
    console.log('Note Data ==> ', data)
    return data
  } catch (error) {
    console.log('Save Notes to database Error', error.response)
  }
}

/**
 * dlete note
 */
export const deleteNote = async (note, context, i) => {
  console.log('NOte ==> ', note)
  const id = note._id

  var notes = context.state.notes

  try {
    const response = await axios.delete(`/api/note/${id}/delete`, note)
    const { data } = response
    // notes = notes.filter(function (item) {
    //   return item !== i
    // })

    // context.setNotes(notes)
    console.log('Notes  ==> ', data)
    return data
  } catch (error) {
    console.log('Delete Notes from  database Error', error.response)
  }
}

/**
 * dlete note
 */
export const updateNote = async (noteData, context, noteId) => {
  // console.log('NOteIdUpdate ==> ', note)
  // const id = note._id
  // const idString = id.toString()
  var notes = context.state.notes

  // console.log('ID ==>', idString)
  try {
    const response = await axios.post(`/api/note/${noteId}/update`, noteData)
    const { data } = response
    // notes = notes.filter(function (item) {
    //   return item !== i
    // })

    // context.setNotes(notes)
    console.log('Notes  ==> ', data)
    return data
  } catch (error) {
    console.log('Delete Notes from  database Error', error.response)
  }
}
