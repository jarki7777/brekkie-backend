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
        totalFat: { type: String },
        totalSaturatedFat: { type: String },
        totalSodium: { type: String },
        totalCarbs: { type: String },
        totalFiber: { type: String },
        totalSugar: { type: String },
        totalProteins: { type: String }
    }
});

const FoodLog = mongoose.model('FoodLog', FoodLogSchema, 'food_logs');

export default FoodLog;