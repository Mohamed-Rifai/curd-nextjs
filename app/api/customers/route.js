import connectMongo from '../../../lib/mongodb'
import Customer from '../../../models/Customers'


export async function GET(){

    await connectMongo();
    const customers = await Customer.find()
   
    
    return new Response(JSON.stringify(customers),{status:200})

}


export async function POST(req) {

  await connectMongo()
  const body = await req.json()
  const customer = await Customer.create(body)
  return new Response(JSON.stringify(customer),{status:201})
     
    
    
}