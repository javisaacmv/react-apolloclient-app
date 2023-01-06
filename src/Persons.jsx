import { useEffect, useState } from "react"
import { useFindPerson } from "./cutomHooks/persons"




const Persons = ({persons}) => {

    const {getPerson, result} = useFindPerson()
    const [person, setPerson] = useState(null)
    const showPerson = name => {
        getPerson({variables: {name}})
    }

    useEffect(() => {
        if(result.data){
            setPerson(result.data.findPerson)
        }
    },[result])

    if(person){
        return (
            <div>
                <h2>{person.name}</h2>
                <div>{person.address.street}, {person.address.city}</div>
                <div>{person.phone}</div>
                <button onClick={() => setPerson(null)}>close</button>
            </div>
        )
    }

    return (
        <div>
            <h2>Persons</h2>
            { persons.map(p => (
                <div key={p.id} onClick={() => {showPerson(p.name)}}>{p.name} {p.phone}</div>
            ))}
        </div>
    )

    
}

export default Persons