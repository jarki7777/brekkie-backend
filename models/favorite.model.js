import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    recipe: [{ 
        type : mongoose.Types.ObjectId, 
        ref: 'Recipe',
        default: []
    }]
});

const Favorite = mongoose.model('Favorite', FavoriteSchema, 'favorites');

export default Favorite;