import React, { useContext, useEffect, useState } from "react";
import "./Wiki.css";
import { useHistory, useParams } from "react-router-dom";
import { WikiContext } from "./WikiProvider";
import { StarContext } from "../Stars/StarProvider";
import { PlanetContext } from "../Planets/PlanetProvider";

export const WikiForm = () => {
  const { addStellarObject } = useContext(WikiContext);
  const { star_types, getStarTypes } = useContext(StarContext);
  const { stars, getStars } = useContext(StarContext);
  const { planets, getPlanets } = useContext(PlanetContext);

  const [stellarObject, setStellarObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [category, setCategory] = useState("");

  const checkForm = () => {
    if (
      (stellarObject.name === undefined || console.log(stellarObject.name),
      console.log(stellarObject.description),
      console.log(stellarObject.mass),
      console.log(stellarObject.radius),
      console.log(stellarObject.discovered_on),
      console.log(stellarObject.discovered_by),
      stellarObject.description === undefined ||
        stellarObject.mass === undefined ||
        stellarObject.radius === undefined ||
        stellarObject.discovered_on === undefined ||
        stellarObject.discovered_by === undefined)
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    getStars();
  }, []);

  useEffect(() => {
    getStarTypes();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      return;
    } else {
      handleSavePost();
    }
  }, [isLoading]);

  const handleSavePost = () => {
    const userId = localStorage.getItem("Galactapedia_user_token");
    if (checkForm() === true) {
      addStellarObject({
        userId: userId,
        name: stellarObject.name,
        description: stellarObject.description,
        mass: stellarObject.mass,
        radius: parseInt(stellarObject.radius),
        discovered_on: stellarObject.discovered_on,
        discovered_by: stellarObject.discovered_by,
        is_dwarf: stellarObject.is_dwarf,
        parent_star: stellarObject.parent_star,
        gravity: stellarObject.gravity,
        orbital_period: stellarObject.orbital_period,
        luminosity: stellarObject.luminosity,
        parent_planet: stellarObject.parent_planet,
        star_type: stellarObject.star_type,
        type: category,
      }).then(() => history.push("/"));
    } else {
      window.alert("Please fill in all form fields before submitting.");
      setIsLoading(false);
    }
  };

  const handleControlledInputChange = (event) => {
    const newWiki = { ...stellarObject };
    newWiki[event.target.name] = event.target.value;
    setStellarObject(newWiki);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setCategory(category);
  };

  return (
    <>
      <h1 className="goldenRodText center">New Wiki</h1>

      <form className="flex post">
        <select
          onChange={handleCategoryChange}
          className="flex post"
          name="category"
          id="category"
        >
          <option value="">Select Category</option>
          <option value="Star">Star</option>
          <option value="Planet">Planet</option>
          <option value="Moon">Moon</option>
          <option value="Asteroid">Asteroid</option>
        </select>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="name">Name:</label>
            <input
              value={stellarObject.name}
              type="name"
              id="name"
              name="name"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="description">Description:</label>
            <textarea
              value={stellarObject.description}
              type="description"
              id="description"
              name="description"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="mass">Mass:</label>
            <input
              value={stellarObject.mass}
              type="mass"
              id="mass"
              name="mass"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="radius">Radius(Whole Number in Miles):</label>
            <input
              value={stellarObject.radius}
              type="radius"
              id="radius"
              name="radius"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="discovered_by">Discovered By:</label>
            <input
              value={stellarObject.discovered_by}
              type="discovered_by"
              id="discovered_by"
              name="discovered_by"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="discovered_on">Discovered On (yyyy-mm-dd):</label>
            <input
              value={stellarObject.discovered_on}
              type="discovered_on"
              id="discovered_on"
              name="discovered_on"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        {console.log(category)}
        {category === "Star" ? (
          <>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Spectral Type:</label>
                <input
                  value={stellarObject.star?.star_type}
                  type="star_type"
                  id="star_type"
                  name="star_type"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">
                  Luminosity (Relative to the Earths Sun):
                </label>
                <input
                  value={stellarObject.star?.luminosity}
                  type="luminosity"
                  id="luminosity"
                  name="luminosity"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
          </>
        ) : null}

        {category === "Planet" ? (
          <>
            <fieldset>
              <div className="center posts  blueText">
                <label className="centerLabel" htmlFor="parent_star">
                  Parent Star:
                </label>
                <select
                  value={stellarObject.planet?.star}
                  name="parent_star"
                  id="parent_star"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">Select Parent Star</option>
                  {stars.map((star) => (
                    <option key={star.id} value={star.id}>
                      {star.stellar_object.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Gravity(M/s):</label>
                <input
                  value={stellarObject.planet?.gravity}
                  type="gravity"
                  id="gravity"
                  name="gravity"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Orbital Period:</label>
                <input
                  value={stellarObject.planet?.orbital_period}
                  type="orbital_period"
                  id="orbital_period"
                  name="orbital_period"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Is Dwarf Planet? (True/ False):</label>
                <input
                  value={stellarObject.planet?.is_dwarf}
                  id="is_dwarf"
                  name="is_dwarf"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
          </>
        ) : null}

        {category === "Moon" ? (
          <>
            <fieldset>
              <div className="center posts  blueText">
                <label className="centerLabel" htmlFor="parent_planet">
                  Parent Planet:
                </label>
                <select
                  value={stellarObject.planet?.star}
                  name="parent_planet"
                  id="parent_planet"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">Select Parent Planet</option>
                  {planets.map((planet) => (
                    <option key={planet.id} value={planet.id}>
                      {planet.stellar_object.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Gravity(M/s):</label>
                <input
                  value={stellarObject.planet?.gravity}
                  type="gravity"
                  id="gravity"
                  name="gravity"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="center posts  blueText">
                <label htmlFor="name">Orbital Period:</label>
                <input
                  value={stellarObject.planet?.orbital_period}
                  type="orbital_period"
                  id="orbital_period"
                  name="orbital_period"
                  className="center  post blueText"
                  onChange={handleControlledInputChange}
                />
              </div>
            </fieldset>
          </>
        ) : null}


        <button
          className="center post blueText"
          disabled={isLoading}
          onClick={(event) => {
            setIsLoading(true);
            event.preventDefault();
          }}
        >
          Save Wiki
        </button>
      </form>
    </>
  );
};