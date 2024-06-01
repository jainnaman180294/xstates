import React, { useEffect, useState } from "react";

function Xstates() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, [])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    )
      .then((res) => res.json())
      .then((data) => setStates(data))
      .then((error) => console.log("Error Fetching States", error));

      console.log("country");
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCity(data))
      .then((error) => console.log("Error Fetching States", error));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>   
      <h1>Select Location</h1>
      <select onChange={(e) => handleCountrySelect(e.target.value)}>
        <option>Select Country</option>
        {countries.map((country) => {
          <option key={country} value={country}>
            {country}
          </option>
        })}
      </select>

      <select onChange={(e) => handleStateSelect(e.target.value)}>
        <option>Select State</option>
        {states.map((state) => {
          <option key={state} value={state}>
            {state}
          </option>
        })}
      </select>

      <select onChange={(e) => handleCitySelect(e.target.value)}>
        <option>Select City</option>
        {city.map((city) => {
          <option key={city} value={city}>
            {city}
          </option>
        })}
      </select>

      {selectedCity && (
        <p>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default Xstates;
