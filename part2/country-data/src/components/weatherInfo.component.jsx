import React from "react";

const WeatherInfo = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <b>temperature: </b>
        {weather.current.temperature}
      </p>
      {weather.current.weather_icons.map((icon, i) => {
        return (
          <img
            key={icon}
            alt={weather.current.weather_descriptions[i]}
            src={icon}
          ></img>
        );
      })}
      <p>
        <b>wind: </b>
        {weather.current.wind_speed} mph {weather.current.wind_dir}
      </p>
    </div>
  );
};

export default WeatherInfo;
