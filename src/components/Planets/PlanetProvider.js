import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const PlanetContext = createContext();

// This component establishes what data can be used.
export const PlanetProvider = (props) => {
  const [planets, setPlanets] = useState([]);


  const api = "http://localhost:8000"

  const getPlanets = () => {
    return fetch(`${api}/planets`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
      .then(setPlanets);
  };

  return (
    <PlanetContext.Provider
      value={{
        getPlanets,
        planets
      }}
    >
      {props.children}
    </PlanetContext.Provider>
  );
};