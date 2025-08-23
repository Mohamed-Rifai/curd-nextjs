import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
 
});

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
