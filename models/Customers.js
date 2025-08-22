import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
 
});

export default  mongoose.model("Customer", CustomerSchema);
