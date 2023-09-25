import { useState } from 'react'
import './App.css'
import axios from "./axios"

function App() {
    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        password: ""
    })

    const handeChange = (e) => {
        const { name, value } = e.target

        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("/auth/register", formData)
            console.log(res.data)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name: </label>
            <input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handeChange}
            />
            <label htmlFor="email">Email: </label>
            <input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handeChange}
            />
            <label htmlFor="password">Password: </label>
            <input 
                id="password"
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handeChange}
            />

            <button type="submit">Register</button>
        </form>
        </>
    )
}

export default App
