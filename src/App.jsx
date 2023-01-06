import reactLogo from './assets/react.svg'
import './App.css'
import Persons from './Persons'
import PersonForm from './PersonForm'
import { useAddedPersonSub, usePersons } from './cutomHooks/persons'
import { useState } from 'react'
import Notify from './Notify'
import PhoneForm from './PhoneForm'
import LoginForm from './LoginForm'
import { useApolloClient } from '@apollo/client'



function App() {

  

  const {data, error, loading} = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const client = useApolloClient()

  useAddedPersonSub()

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(error) return <span style='color: red'>{error}</span>

  return (
    <div className="App">
      <Notify errorMessage={errorMessage}/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {loading
       ? <p>Loading ...</p>
       :
          <Persons persons={data?.allPersons || []}/>
        }
        {token 
          ? <button onClick={logout}>Logout</button>
          : <LoginForm notifyError={notifyError} setToken={setToken} />
        }
        <PhoneForm notifyError={notifyError}/>
        <PersonForm notifyError={notifyError}/>
      
    </div>
  )
}

export default App
