import mongoose from 'mongoose';

const ShoppingListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    ingredients: {
        type: Array,
        default: []
    }
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema, 'shopping_lists');

export default ShoppingList;