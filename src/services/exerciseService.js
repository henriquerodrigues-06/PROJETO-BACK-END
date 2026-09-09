const axios = require('axios');

const getExercises = async (type) => {
  const apiKey = process.env.NINJAS_API_KEY;
  const url = `https://api.api-ninjas.com/v1/exercises?type=${type}`;
  
  const response = await axios.get(url, {
    headers: { 'X-Api-Key': apiKey }
  });

  const exercises = response.data.slice(0, 3).map(exercise => ({
    "nome do exercicio": exercise.name,
    "musculo atingido": exercise.muscle,
    "equipamento(s)": exercise.equipments || exercise.equipment
  }));
  
  return exercises; 
};

module.exports = { getExercises };