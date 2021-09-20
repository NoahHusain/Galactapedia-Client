import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const NavBarContext = createContext();

// This component establishes what data can be used.
export const NavBarProvider = (props) => {

  const api = "http://localhost:8000"

  const searchByName = (name) => {
    return fetch(`${api}/stellarobjects?name=${name}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("Galactapedia_user_token")}`
    }})
      .then((res) => res.json())
  };

  return (
    <NavBarContext.Provider
      value={{
        searchByName
      }}
    >
      {props.children}
    </NavBarContext.Provider>
  );
};