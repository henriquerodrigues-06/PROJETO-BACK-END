const { getWeather } = require('../services/weatherService');
const { getExercises } = require('../services/exerciseService');
const { getFoodIdea } = require('../services/foodService');

const generateRoutine = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'O parâmetro "cidade" é obrigatório.' });
    }

    const weather = await getWeather(city);
    const { temp, condition } = weather;

    const isBadWeather = condition.includes('rain') || temp > 28;
    const exerciseType = isBadWeather ? 'stretching' : 'cardio';
    const exercises = await getExercises(exerciseType);

    const foodQuery = temp < 18 ? 'soup' : 'salad';
    const food = await getFoodIdea(foodQuery);

    return res.json({
      cidade: city,
      clima: {
        temperatura: temp + '°C',
        condição: weather.description
      },
      rotina: {
        exercicio: {
          ambiente: isBadWeather ? 'Em casa' : 'Ao ar livre',
          tipo: exerciseType,
          exercicios: exercises
        },
        dieta: {
          tipo: foodQuery === 'sopa' ? 'Comida Quente' : 'Comida Leve',
          sugestão: food
        }
      }
    });

  } catch (error) {
    console.error("Erro na requisição:", error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Cidade não encontrada." });
    }
    
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

module.exports = { generateRoutine };