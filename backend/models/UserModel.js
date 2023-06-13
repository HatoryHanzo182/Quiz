import mongoose from 'mongoose';

 // This code defines the schema and model for the "users" collection in MongoDB, 
// which allows you to work with user data in this collection through Mongoose.
const userSchema = new mongoose.Schema(
{
    name: String,
    surname: String,
    email: String,
    login: String,
    hesh_pass: String,
    teacher_code: String,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;