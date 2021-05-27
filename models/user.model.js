import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number
});

const User = mongoose.model('User', UserSchema);

export default User;