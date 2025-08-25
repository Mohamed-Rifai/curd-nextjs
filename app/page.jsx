"use client";
import { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import toast from "react-hot-toast";

export default function Home(){

    const [customers,setCustomers] = useState([])
    const [form,setForm] = useState({name:"",email:""})
    const [editingId,setEditingId] = useState(null)
      //deletion states
    const [open, setOpen] = useState(false)
    const [selectedCust, setSelectedCust] = useState(null)


    //fetch all customers -get method
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
    const res=    await fetch('/api/customers',{
          method:'PUT',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id:editingId,...form})
       }) 
       const data =await res.json()
     
       if (res.ok) {
        toast.success(data.message)
        setEditingId(null);
       }else{
        toast.error(data.error||'something went wrong')
       }
        
      
 }else{
     const res= await fetch('/api/customers',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
     }) 
     const data =await res.json()
     
     if (res.ok) {
      toast.success(data.message)
     }else{
      toast.error(data.error||'somthing went wrong')
     }
     }
            setForm({name:"",email:""});
               fetchCustomers()

    }
    const handleEdit = (cust)=> {
      setForm({name:cust.name,email:cust.email})
      setEditingId(cust._id)
        
    }
    //confirmation modal show
    const handleClickDelete = (cust)=> {
          setSelectedCust(cust)
          setOpen(true)
    }


    const handleConfirmDelete = async()=>{
      if(!selectedCust) return;
      const res =   await fetch('/api/customers',{
          method:'DELETE',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id:selectedCust._id})
        })
         setOpen(false)
        const data =await res.json()
       
        if(res.ok){
          toast.success(data.message)
           fetchCustomers()
        }else{
          toast.error(data.error||'something went wrong')
        }
       
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
                <button onClick={()=>handleClickDelete(cust)}>Delete</button>
              </td>
            </tr>


         ))}
           
         
        </tbody>
      </table>
            {/* modal */}
       <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Are you sure you want to delete 
          <b> {selectedCust?.name}</b>?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleConfirmDelete} color="error">Yes</Button>
        </DialogActions>
      </Dialog>

    </div>

    )
}