import React, { useState, useEffect } from 'react'
import Form from '../src/Components/UI/Formular'
import Devices from '../src/Components/Devices'
import {
  DEVICE_DATA_PATH,
  USERS_DATA_PATH,
  DeviceDataTypes,
  UserTypes,
} from './Types/config'
import './App.css'

/**
 * The App component serves as the main entry point of the application.
 * It manages the state for the current user and any messages to be displayed.
 *
 * - The component initially fetches user data from a JSON file and stores it in state.
 * - It renders either the Devices component or a login Form based on whether a user is currently logged in.
 * - The handleLogin function is responsible for validating user credentials.
 */
const App: React.FC = () => {

  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<UserTypes[]>([])
  const [currentUser, setCurrentUser] = useState<UserTypes | null>(null)

  /**
   * Fetch the users demo data from the JSON file
   */
  useEffect(() => {
    fetch(USERS_DATA_PATH)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Data load Error:', error))
  }, [])

  /**
   * Function to handle login.
   * It checks if the email exists in the
   * users JSON and if the password matches.
   * @param {any} formData - The data from the form.
   */
  const handleLogin = (formData: any) => {
    
    const user = users.find((u) => u.email === formData.email)

    if (!user) {
      setMessage('Email not known')
      return
    }

    /**
     * For demonstration, we're using plain text.
     * In a real application, we should compare hashed passwords.
     **/
    if (user.password !== formData.password) {
      setMessage('Password does not match the email')
      return
    }

    setCurrentUser(user)
  }

  return (
    <div className='App'>
      {currentUser ? (
        <Devices<DeviceDataTypes> dataPath={DEVICE_DATA_PATH} />
      ) : (
        <>
          <Form onSubmit={handleLogin} />
          {message && <div className='errorMessage'>{message}</div>}
        </>
      )}
    </div>
  )
}

export default App
