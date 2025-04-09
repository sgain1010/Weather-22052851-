import { useContext } from "react";
import { WeatherDataContext } from "../context/weatherDataContext";

/**
 * Custom hook to fetch weather data from the API.
 * @param {string} defaultUrl - Optional default URL for fetching weather data.
 * @returns {Object} - An object containing the fetchWeatherData function.
 */

export function useWeatherData(defaultUrl) {
  const { dispatch } = useContext(WeatherDataContext);

  const fetchWeatherData = async (urlOverride) => {
    const urlToFetch = urlOverride || defaultUrl;

    if (urlToFetch) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await fetch(urlToFetch);
        if (!response.ok) {
          throw new Error('Network response was not ok or City name is invalid');
        }
        const result = await response.json();

        if (result) {
          dispatch({ type: 'SET_WEATHER_DATA', payload: result });
          dispatch({ type: 'SET_ERROR', payload: "" });
        } else {
          throw new Error("Weather data not available");
        }

      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_ERROR', payload: "Geo Location Failed" });
    }
  };

  return { fetchWeatherData };
}