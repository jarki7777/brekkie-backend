export const calculateTotalCalories = (recipes) => {
    let recipesCalories = [];

    for (const element of recipes) {
        recipesCalories.push(Number(element.caloriesPerServe));
    }

    const totalCalories = recipesCalories.reduce((total, num) => {
        return total + num
    });

    return totalCalories;
}