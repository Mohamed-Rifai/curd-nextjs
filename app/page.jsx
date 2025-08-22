"use client";
import { useEffect, useState } from "react"

export default function Home(){

    const [customers,setCustomers] = useState([])
    const [form,setForm] = useState({name:"",email:""})



    useEffect(()=>{

    },[])


    const handleChange =(e)=> {
        setForm({ ...form, [e.target.name]: e.target.value });
                    
    }

    const handleSubmit =(e)=> {
        e.preventDefault()
     console.log(e);
     
    }

    return (

         <div style={{ padding: "20px" }}>
      

     
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
         
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          
          
          required
        />
        
        <button type="submit">
          
        </button>
      </form>

  
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
            <tr >
              <td>cust.name</td>
              <td>cust.email</td>
              
              <td>
                <button >Edit</button>
                <button >Delete</button>
              </td>
            </tr>
         
        </tbody>
      </table>
    </div>
    )
}