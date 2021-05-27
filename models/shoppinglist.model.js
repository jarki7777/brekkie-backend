import mongoose from 'mongoose';

const ShoppingListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    ingredients: {
        type: Array
    }
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema, 'shoppinglists');

export default ShoppingList;