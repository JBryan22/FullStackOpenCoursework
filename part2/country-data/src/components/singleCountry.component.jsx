import React from "react";

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img alt="country-flag" src={country.flag}></img>
    </div>
  );
};

export default SingleCountry;
