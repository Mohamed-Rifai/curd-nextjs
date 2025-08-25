import connectMongo from '../../../lib/mongodb'
import Customer from '../../../models/Customers'


export async function GET(){
try {
     await connectMongo();
    const customers = await Customer.find() 
    return new Response(JSON.stringify(customers),{status:200})
} catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}

export async function POST(req) {
try {
      await connectMongo()
  const body = await req.json()
  await Customer.create(body)
  return new Response(JSON.stringify({message:'added successfully'}),{status:201})
      
} catch (err) {
     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    
} }

export async function PUT(req){

    try {
        console.log('reached in put funtion');
        
        await connectMongo()
        const body =await req.json()
         console.log(body);
         
        const updatedCustomer = await Customer.findByIdAndUpdate(
            body.id,
            {name:body.name,email:body.email},   
                  
        )
                   console.log(updatedCustomer);

        return new Response(JSON.stringify({message:"Updated successfully"}),{status:200})
    } catch (err) {
         return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
    

}

export async function DELETE(req){
try {
     await connectMongo()

    const body = await req.json()
    const {id} = body

    await Customer.findByIdAndDelete(id)
     return new Response(JSON.stringify({ message: "Customer deleted successfully" }), { status: 200 });
} catch (err) {
     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
   
}