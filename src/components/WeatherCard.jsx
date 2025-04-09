import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperature0,
  faTemperature2,
  faTemperatureHigh,
  faRotateRight,
  faWind,
  faDroplet,
  faC,
  faF
} from "@fortawesome/free-solid-svg-icons";
import MiniCard from "./WeatherMiniCard";
import { celciusToFarenheit } from "../util/converter";
import { useWeatherCardLogic } from "../hook/useWeatherCardLogic";
import "../assets/main.css";
import "../assets/card.css";
import { ToggleSwitch } from "reactjs-toggleswitch";

const WeatherCard = ({ data }) => {
  const { refresh, convertTemp, farenheit, state, background } = useWeatherCardLogic(data);

  if (!data || !data.weather || !data.main) return null;

  return (
    <Card
      className={state.dark ? "card-dark" : "card-light"}
      style={{
        width: "90%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container-card">
        <div className="column">
          <div className="image-card">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
          <h3 className={state.dark ? "styled-text-dark" : "styled-text-light"}>
            {data.weather[0].description}
          </h3>
          <h1 className={state.dark ? "styled-text-dark" : "styled-text-light"}>
            {farenheit ? celciusToFarenheit(data.main.temp) : data.main.temp}
            {farenheit ? "°F" : "°C"}
          </h1>
          <h6 className={state.dark ? "styled-text-dark" : "styled-text-light"}>
            <b>{data.name}, {data.sys.country}</b>
          </h6>
          <ToggleSwitch
            checked={farenheit}
            thumbOnColor="#fff"
            thumbOffColor="#000"
            offColor="#fff"
            onColor="#000"
            onToggle={convertTemp}
          >
            <FontAwesomeIcon icon={farenheit ? faF : faC} />
          </ToggleSwitch>
        </div>

        <div className="column second">
          <div className="column-c">
            <MiniCard
              icon={faTemperatureHigh}
              text="Max: "
              cdata={farenheit ? celciusToFarenheit(data.main.temp_max) : data.main.temp_max}
              unit={farenheit ? "°F" : "°C"}
            />
            <MiniCard
              icon={faWind}
              text="Wind: "
              cdata={(data.wind.speed * 3.6).toFixed(1)}
              unit="km/hr"
            />
          </div>

          <div className="column-c">
            <MiniCard
              icon={faTemperature0}
              text="Min: "
              cdata={farenheit ? celciusToFarenheit(data.main.temp_min) : data.main.temp_min}
              unit={farenheit ? "°F" : "°C"}
            />
            <MiniCard
              icon={faTemperature2}
              text="Feels Like: "
              cdata={farenheit ? celciusToFarenheit(data.main.feels_like) : data.main.feels_like}
              unit={farenheit ? "°F" : "°C"}
            />
            <MiniCard
              icon={faDroplet}
              text="Humidity: "
              cdata={data.main.humidity}
              unit="%"
            />
          </div>

          <button
            className={state.dark ? "button button-dark" : "button button-light"}
            onClick={refresh}
          >
            <FontAwesomeIcon icon={faRotateRight} spin />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
