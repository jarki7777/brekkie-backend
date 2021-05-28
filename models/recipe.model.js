import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
        default: null
    },
    oneStarVotes: {
        type: Number,
        default: null
    },
    twoStarVotes: {
        type: Number,
        default: null
    },
    threeStarVotes: {
        type: Number,
        default: null
    },
    fourStarVotes: {
        type: Number,
        default: null
    },
    fiveStarVotes: {
        type: Number,
        default: null
    },
    totalVotes: {
        type: Number,
        default: null
    },
    calification: {
        type: Number,
        default: null
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