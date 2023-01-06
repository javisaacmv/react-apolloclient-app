import { useState } from "react"
import { useLogin } from "./cutomHooks/users"

const LoginForm = ({notifyErorr, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login ] = useLogin(notifyErorr, setToken)

    const handleSubmit = (event) => {
        event.preventDefault()
        login({variables: {username, password}})
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input 
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input 
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )

}

export default LoginForm 