import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const PostContext = createContext();

// This component establishes what data can be used.
export const PostProvider = (props) => {
  const [stellarObjects, setStellarObjects] = useState([]);

  const api = "http://localhost:8000"

  const getStellarObjects = () => {
    return fetch(`${api}/stellarobjects`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
      .then(setStellarObjects);
  };

  const addStellarObject = (stellarObject) => {
    return fetch(`${api}/stellarobjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stellarObject),
    }).then(getStellarObjects);
  };

  return (
    <PostContext.Provider
      value={{
        stellarObjects,
        getStellarObjects,
        addStellarObject
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
