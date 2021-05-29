export const calculateTotalNutrients = (recipes) => {
    let fat = []
    let saturatedFat = []
    let sodium = []
    let carbs = []
    let fiber = []
    let sugar = []
    let protein = []

    const getAllTotalMacronutrients = (arr, nutrientName) => {

        for (const elements of recipes) {
            arr.push(Number(elements.nutritionalInfo[nutrientName].replace(/g|mg/g, '')))

        }
        const getTotalNutrient = (nutrient) => {
            return nutrient.reduce((total, num) => {
                return Math.round((total + num) * 10) / 10;
            });
        }

        return getTotalNutrient(arr);
    }

    const totalMacroNutrients = {
        totalFat: getAllTotalMacronutrients(fat, 'fat'),
        totalSaturatedFat: getAllTotalMacronutrients(saturatedFat, 'saturatedFat'),
        totalSodium: getAllTotalMacronutrients(sodium, 'sodium'),
        totalCarbs: getAllTotalMacronutrients(carbs, 'carbs'),
        totalFiber: getAllTotalMacronutrients(fiber, 'fiber'),
        totalSugar: getAllTotalMacronutrients(sugar, 'sugar'),
        totalProteins: getAllTotalMacronutrients(protein, 'protein')
    }

    return totalMacroNutrients;
}