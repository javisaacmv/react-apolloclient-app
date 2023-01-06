import { useState } from "react";
import { useCreatePerson } from "./cutomHooks/persons";




const PersonForm = ({notifyError}) => {
    const [name, setName ] = useState('')
    const [phone, setPhone ] = useState('')
    const [street, setStreet ] = useState('')
    const [city, setCity ] = useState('')


    const {createPerson}  = useCreatePerson(notifyError)

    const handleSubmit = async(e) => {
        e.preventDefault()

        await createPerson({ variables: {name, phone, street, city}})
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>Create new Person</h2>
            <form onSubmit={handleSubmit}>
                <input value={name} placeholder='name' onChange={ evt => setName(evt.target.value)}/>
                <input value={phone} placeholder='phone' onChange={ evt => setPhone(evt.target.value)}/>
                <input value={street} placeholder='street' onChange={ evt => setStreet(evt.target.value)}/>
                <input value={city} placeholder='city' onChange={ evt => setCity(evt.target.value)}/>
                <button>Add Person</button>
      </form>
        </div>
    )

}

export default PersonForm