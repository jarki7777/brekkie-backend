import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const FoodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    day: Date,
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

FoodLogSchema.plugin(mongoosePaginate);
const FoodLog = mongoose.model('FoodLog', FoodLogSchema, 'food_logs');

export default FoodLog;