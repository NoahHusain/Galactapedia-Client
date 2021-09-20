import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBarProvider } from "./nav/NavBarProvider";


export const Galactapedia = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("Galactapedia_user_token")) {
          return (
            <>
            <NavBarProvider>
              <NavBar />
              <ApplicationViews />
              </NavBarProvider>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);