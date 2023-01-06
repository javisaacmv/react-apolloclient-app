import { useState } from "react";
import {  useEditNumber } from "./cutomHooks/persons";




const PhoneForm = ({notifyError}) => {
    const [name, setName ] = useState('')
    const [phone, setPhone ] = useState('')
    


    const {editNumber}  = useEditNumber(notifyError)

    const handleSubmit = async(e) => {
        e.preventDefault()

        await editNumber({ variables: {name, phone}})
        setName('')
        setPhone('')
      
    }

    return (
        <div>
            <h2>Edit Phone</h2>
            <form onSubmit={handleSubmit}>
                <input value={name} placeholder='name' onChange={ evt => setName(evt.target.value)}/>
                <input value={phone} placeholder='phone' onChange={ evt => setPhone(evt.target.value)}/>
               
                <button>Edit Phone</button>
      </form>
        </div>
    )

}

export default PhoneForm