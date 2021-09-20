import React from "react";
import { Route } from "react-router-dom";
import { WikiProvider } from "./Wiki/WikiProvider";
import { WikiList } from "./Wiki/WikiList";
import { EditWiki } from "./Wiki/EditWiki";
import { WikiForm } from "./Wiki/WikiForm";
import { WikiDetail } from "./Wiki/WikiDetail";
import { StarProvider } from "./Stars/StarProvider";
import { PlanetProvider } from "./Planets/PlanetProvider";
import { NavBarProvider } from "./nav/NavBarProvider";


export const ApplicationViews = () => {
  return (
    <>
      <WikiProvider>
        <StarProvider>
        <PlanetProvider>
        <NavBarProvider>
        <Route exact path="/">
          <WikiList />
        </Route>

        <Route exact path="/wiki/:stellarObjectId(\d+)">
          <WikiDetail />
        </Route>

        <Route exact path="/wiki/create">
          <WikiForm />
        </Route>

        <Route exact path="/wiki/edit/:stellarObjectId(\d+)">
          <EditWiki />
        </Route>
        </NavBarProvider>
        </PlanetProvider>
        </StarProvider>
      </WikiProvider>
    </>
  );
};
