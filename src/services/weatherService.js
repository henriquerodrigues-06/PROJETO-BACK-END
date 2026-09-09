const axios = require('axios');

const getWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  const response = await axios.get(url);
  
  return {
    temp: response.data.main.temp,
    condition: response.data.weather[0].main.toLowerCase(),
    description: response.data.weather[0].description
  };
};

module.exports = { getWeather };