import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    img: {
        type: String,
        unique: true,
        required: true
    },
    prepTime: {
        type: String,
        default: 0
    },
    cookTime: {
        type: String,
        default: 0
    },
    totalTime: {
        type: String,
        default: 0
    },
    category: String,
    method: String,
    cuisine: String,
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    notes: Array,
    serves: {
        type: Number,
        required: true,
        min: 1
    },
    caloriesPerServe: {
        type: Number,
        required: true,
        min: 1
    },
    nutritionalInfo: {
        fat: String,
        saturatedFat: String,
        sodium: String,
        carbs: String,
        fiber: String,
        sugar: String,
        protein: String
    },
    timesFavorite: {
        type: Number,
        default: 0
    },
    oneStarVotes: {
        type: Number,
        default: 0
    },
    twoStarVotes: {
        type: Number,
        default: 0
    },
    threeStarVotes: {
        type: Number,
        default: 0
    },
    fourStarVotes: {
        type: Number,
        default: 0
    },
    fiveStarVotes: {
        type: Number,
        default: 0
    },
    totalVotes: {
        type: Number,
        default: 0
    },
    calification: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
});

RecipeSchema.plugin(mongoosePaginate);
const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');

export default Recipe;