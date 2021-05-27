import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
// username can't contain whitespaces must be between 4 and 20 characters,
// can contain only letters, numbers and any of these non consecutive special characters '-._' 
                return /^([a-z0-9]|[-._](?![-._])){4,20}$/i.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
// email must be a valid email string
                return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'mod', 'client'],
        default: 'client'
    },
    caloriesGoal: {
        type: Number,
        min: 1
    },
    inventory: {
        type: mongoose.Types.ObjectId,
        ref: 'Inventory'
    },
    shoppingList: {
        type: mongoose.Types.ObjectId,
        ref: 'ShoppingList'
    },
    favorites: {
        type: mongoose.Types.ObjectId,
        ref: 'Favorites'
    },
    phone: Number
});

const User = mongoose.model('User', UserSchema, 'users');

export default User;