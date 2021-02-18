import React from "react";

const CountryInfo = ({ countriesToShow, handleShowCountry }) => {
  if (countriesToShow.length === 0) {
    return <div>There are too many matches. Please narrow your search</div>;
  } else {
    return (
      <ul>
        {countriesToShow.map((country) => {
          return (
            <li key={country.name}>
              <span className="countryNameList">{country.name}</span>{" "}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default CountryInfo;
