import { useContext, useEffect } from 'react';
import { useWeatherData } from './useWeatherData';
import { WeatherDataContext } from '../context/weatherDataContext';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b4b62b773c8da391c3bd9ea1bf651d12'; // 🔐 Consider moving to .env for production

const useButtonLocationLogic = () => {
  const { state, dispatch } = useContext(WeatherDataContext);
  const { fetchWeatherData } = useWeatherData();

  // Fetch user's location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({ type: 'SET_LAT', payload: latitude });
          dispatch({ type: 'SET_LON', payload: longitude });
        },
        (error) => {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      );
    } else {
      dispatch({ type: 'SET_ERROR', payload: "Geolocation is not supported by your browser." });
    }
  }, [dispatch]);

  // Button click: fetch weather
  const handleFetchWeather = () => {
    if (state.latitude && state.longitude) {
      const url = `${API_URL}?lat=${state.latitude}&lon=${state.longitude}&units=metric&appid=${API_KEY}`;
      fetchWeatherData(url);
    } else {
      dispatch({ type: 'SET_ERROR', payload: "Latitude or Longitude not available yet." });
    }
  };

  return { handleFetchWeather };
};

export default useButtonLocationLogic;
