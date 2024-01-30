import mongoose, { Schema } from 'mongoose';

// Define a schema
const userSchema = new Schema({
  name: String,
  email: String,
  age: Number
});

// Define a model
const User = mongoose.model('users', userSchema);

export default User;
