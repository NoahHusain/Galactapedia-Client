import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const StarContext = createContext();

// This component establishes what data can be used.
export const StarProvider = (props) => {
  const [stars, setStars] = useState([]);
  const [star_types, setStarTypes] = useState([]);


  const api = "http://localhost:8000"

  const getStars = () => {
    return fetch(`${api}/stars`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
      .then(setStars);
  };

  const getStarTypes = () => {
    return fetch(`${api}/startypes`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
      .then(setStarTypes);
  };

  return (
    <StarContext.Provider
      value={{
        getStars,
        getStarTypes,
        stars,
        star_types,
      }}
    >
      {props.children}
    </StarContext.Provider>
  );
};