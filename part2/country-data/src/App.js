import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Filter from "./components/filter.component";
import CountryInfo from "./components/countryInfo.component";
import SingleCountry from "./components/singleCountry.component";
import WeatherInfo from "./components/weatherInfo.component";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [countryToShow, setCountryToShow] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const COUNTRY_LIMIT = 10;
  const visibleWeatherData = weatherData ? (
    <WeatherInfo weather={weatherData}></WeatherInfo>
  ) : null;

  let countriesToShow = countries.filter(
    (country) => country.name.toLowerCase().indexOf(filterValue) > -1
  );
  if (countriesToShow.length > COUNTRY_LIMIT) {
    countriesToShow = [];
  }
  if (countriesToShow.length === 1 && countriesToShow[0] !== countryToShow) {
    updateCountryToShowInfo(countriesToShow[0]);
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  function updateCountryToShowInfo(country) {
    setCountryToShow(country);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.name}`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setCountryToShow(null);
    setWeatherData(null);
  };

  const handleShowCountry = (country) => {
    updateCountryToShowInfo(country);
  };

  let singleCountry = countryToShow ? (
    <SingleCountry country={countryToShow}></SingleCountry>
  ) : null;
  return (
    <div className="App">
      <h1>Country Finder</h1>
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      ></Filter>
      <CountryInfo
        handleShowCountry={handleShowCountry}
        countriesToShow={countriesToShow}
      ></CountryInfo>
      {singleCountry}
      {visibleWeatherData}
    </div>
  );
}
export default App;
