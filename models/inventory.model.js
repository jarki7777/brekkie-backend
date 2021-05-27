import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
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

const Inventory = mongoose.model('Inventory', InventorySchema, 'inventories');

export default Inventory;