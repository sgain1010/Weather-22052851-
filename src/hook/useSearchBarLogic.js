import { useContext } from 'react';
import { useWeatherData } from './useWeatherData';
import { WeatherDataContext } from '../context/weatherDataContext';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b4b62b773c8da391c3bd9ea1bf651d12'; // 🔐 move to .env for production

const useSearchBarLogic = () => {
  const { state, dispatch } = useContext(WeatherDataContext);
  const { fetchWeatherData } = useWeatherData();

  const handleChange = (value) => {
    dispatch({ type: 'SET_CITY', payload: value });
  };

  const fetchDetails = (event) => {
    event?.preventDefault();

    if (!state.city || state.city.trim() === "") {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a city name.' });
      return;
    }

    const url = `${API_URL}?q=${encodeURIComponent(state.city)}&units=metric&appid=${API_KEY}`;
    fetchWeatherData(url);
  };

  return { handleChange, fetchDetails };
};

export default useSearchBarLogic;
