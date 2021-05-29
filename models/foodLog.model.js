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
        totalFat: Number,
        totalSaturatedFat: Number,
        totalSodium: Number,
        totalCarbs: Number,
        totalFiber: Number,
        totalSugar: Number,
        totalProteins: Number
    }
});

FoodLogSchema.plugin(mongoosePaginate);
const FoodLog = mongoose.model('FoodLog', FoodLogSchema, 'food_logs');

export default FoodLog;