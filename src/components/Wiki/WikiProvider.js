import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const WikiContext = createContext();

// This component establishes what data can be used.
export const WikiProvider = (props) => {
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

  const getStellarObjectById = (getStellarObjectId) => {
    return fetch(`${api}/stellarobjects/${getStellarObjectId}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
  };

  const addStellarObject = (stellarObject) => {
    return fetch(`${api}/stellarobjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
      },
      body: JSON.stringify(stellarObject),
    }).then(getStellarObjects);
  };

  const deleteStellarObject = (stellarObjectId) => {
    return fetch(
      `${api}/stellarobjects/${stellarObjectId}`,{ 
        method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
        }
      }
    ).then(getStellarObjects);
  };

  const checkIfStaff = () => {
    return fetch(
      `${api}/users`,{ 
        method: "GET",
        headers: {
          "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
        }
      }
    ).then((res) => res.json())
  };

  const updateStellarObject = (stellarObject) => {
    return fetch(
      `${api}/stellarobjects/${stellarObject.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
        },
        body: JSON.stringify(stellarObject),
      }
    ).then(getStellarObjects);
  };

  return (
    <WikiContext.Provider
      value={{
        stellarObjects,
        getStellarObjects,
        addStellarObject,
        getStellarObjectById,
        deleteStellarObject,
        checkIfStaff,
        updateStellarObject
      }}
    >
      {props.children}
    </WikiContext.Provider>
  );
};
