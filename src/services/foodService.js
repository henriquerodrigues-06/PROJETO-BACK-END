const axios = require('axios');

const getFoodIdea = async (query) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const response = await axios.get(url);
  
  if (!response.data.meals) return null;
  
  const meal = response.data.meals[0];
  return {
    "nome do prato": meal.strMeal,
    "categoria": meal.strCategory,
    "receita": meal.strSource || meal.strYoutube
  };
};

module.exports = { getFoodIdea };