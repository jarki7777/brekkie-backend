export const calculateCalification = (recipe) => {
    const totalOneStars = recipe.oneStarVotes;
    const totalTwoStars = recipe.twoStarVotes * 2;
    const totalThreeStars = recipe.threeStarVotes * 3;
    const totalFourStars = recipe.fourStarVotes * 4;
    const totalFiveStars = recipe.fiveStarVotes * 5;
    const totalStars = totalOneStars + totalTwoStars + totalThreeStars + totalFourStars + totalFiveStars;
    const calification = Math.round((totalStars / recipe.totalVotes) * 10) / 10;
    return calification
}