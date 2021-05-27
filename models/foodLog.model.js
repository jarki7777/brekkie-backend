import mongoose from 'mongoose';

const FoodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        default: []
    }],
    totalCalories: Number,
    totalNutrients: {
        totalFat: String,
        totalSaturatedFat: String,
        totalSodium: String,
        totalCarbs: String,
        totalFiber: String,
        totalSugar: String,
        totalProteins: String
    }
});

const FoodLog = mongoose.model('FoodLog', FoodLogSchema, 'food_logs');

export default FoodLog;