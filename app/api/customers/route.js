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
  const customer = await Customer.create(body)
  return new Response(JSON.stringify(customer),{status:201})
      
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

        return new Response(JSON.stringify(updatedCustomer),{status:200})
    } catch (err) {
         return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
    

}