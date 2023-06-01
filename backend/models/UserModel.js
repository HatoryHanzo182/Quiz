import mongoose from 'mongoose';

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