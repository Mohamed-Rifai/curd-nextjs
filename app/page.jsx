"use client";
import { useEffect, useState } from "react"

export default function Home(){

    const [customers,setCustomers] = useState([])
    const [form,setForm] = useState({name:"",email:""})


    const fetchCustomers = async ()=> {
        const res = await fetch('/api/customers')
        const data =await res.json()
        setCustomers(data)
        
        
        
    }

    useEffect(()=>{
       fetchCustomers()
    },[])


    const handleChange =(e)=> {
        setForm({ ...form, [e.target.name]: e.target.value });
                    
    }

    const handleSubmit =async (e)=> {
        e.preventDefault()
     
     await fetch('/api/customers',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
     }) 
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
         {customers.map((cust)=>(
    
    console.log(cust),
    
 <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              
              <td>
                <button >Edit</button>
                <button >Delete</button>
              </td>
            </tr>


         ))}
           
         
        </tbody>
      </table>
    </div>
    )
}