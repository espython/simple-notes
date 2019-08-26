import { User } from '../models'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateRegisterInputs, validateLoginInput } from '../validation'

const router = express.Router()

/**
 * Register Route
 */
router.post('/signup', (req, res) => {
  // form validation
  const { errors, isValid } = validateRegisterInputs(req.body)
  console.log('body', req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Check the user is already in the database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password

    })
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err
      }
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err
        }
        newUser.password = hash
        newUser
          .save()
          .then(userSave => res.json(userSave))
          .catch(err => console.log(err))
      })
    })
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)
  console.log('Body', req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { email } = req.body
  const { password } = req.body
  // find user by email
  User.findOne({ email }).then(user => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ error: 'Email not found' })
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        }
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              throw err
            }
            res.json({ success: true, token: `Bearer ${token}` })
          }
        )
      } else {
        return res.status(400).json({ error: 'Password incorrect' })
      }
    })
  })
})

export default router
