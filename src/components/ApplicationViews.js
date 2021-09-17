import React from "react";
import { Route } from "react-router-dom";
import { WikiProvider } from "./Wiki/WikiProvider";
import { WikiList } from "./Wiki/WikiList";
import { EditWiki } from "./Wiki/EditWiki";
import { WikiForm } from "./Wiki/WikiForm";
import { WikiDetail } from "./Wiki/WikiDetail";
import { StarProvider } from "./Stars/StarProvider";
import { PlanetProvider } from "./Planets/PlanetProvider";


export const ApplicationViews = () => {
  return (
    <>
      <WikiProvider>
        <StarProvider>
        <PlanetProvider>
        <Route exact path="/">
          <WikiList />
        </Route>

        <Route exact path="/wiki/:stellarObjectId(\d+)">
          <WikiDetail />
        </Route>

        <Route exact path="/wiki/create">
          <WikiForm />
        </Route>

        <Route exact path="/posts/edit/:postId(\d+)">
          <EditWiki />
        </Route>
        </PlanetProvider>
        </StarProvider>
      </WikiProvider>
    </>
  );
};
