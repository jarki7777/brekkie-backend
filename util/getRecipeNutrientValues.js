export const getRecipeNutrientValues = (recipe) => {
    Object.keys(recipe).forEach(key => {
        recipe[key] = Number(recipe[key].replace(/g|mg/g, ''));
        recipe[key] = Math.round((recipe[key]) * 10) / 10;
      });
}