"use client";
import { useEffect, useState } from "react"

export default function Home(){

    const [customers,setCustomers] = useState([])
    const [form,setForm] = useState({name:"",email:""})
    const [editingId,setEditingId] = useState(null)


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
     if(editingId){
       await fetch('/api/customers',{
          method:'PUT',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id:editingId,...form})
       })    
          setEditingId(null);
     }else{
     await fetch('/api/customers',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
     }) 
     }
            setForm({name:"",email:""});
               fetchCustomers()

    }
    const handleEdit = (cust)=> {
      setForm({name:cust.name,email:cust.email})
      setEditingId(cust._id)
        
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
          {editingId?"Update":"Add"}
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
    
 <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              
              <td>
                <button onClick={()=>handleEdit(cust)} >Edit</button>
                <button >Delete</button>
              </td>
            </tr>


         ))}
           
         
        </tbody>
      </table>
    </div>
    )
}