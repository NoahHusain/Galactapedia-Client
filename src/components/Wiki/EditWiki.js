import React, { useContext, useEffect, useState } from "react";
import "./Wiki.css";
import { useHistory, useParams } from "react-router-dom";
import { WikiContext } from "./WikiProvider";
import { StarContext } from "../Stars/StarProvider";
import { PlanetContext } from "../Planets/PlanetProvider";

export const EditWiki = () => {
  const { updateStellarObject, getStellarObjectById } = useContext(WikiContext);

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [wiki, setWiki] = useState({});


  const { stellarObjectId } = useParams();
	const [currentPicture, setCurrentPicture] = useState({});

  const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

  const createPostImageString = (event) => {
		getBase64(event.target.files[0], (base64ImageString) => {
			// console.log("Base64 of file is", base64ImageString);

			// Update a component state variable to the value of base64ImageString
			setCurrentPicture(base64ImageString);
		});
	};

  const checkForm = () => {
    if (
      (wiki.name === undefined ||
        wiki.description === undefined ||
        wiki.mass === undefined ||
        wiki.radius === undefined ||
        wiki.discovered_on === undefined ||
        wiki.discovered_by === undefined)
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getStellarObjectById(stellarObjectId).then(wiki => {
        const response_object = {
        id: wiki.id,
        name: wiki.stellar_object.name,
        description: wiki.stellar_object.description,
        mass: wiki.stellar_object.mass,
        radius: wiki.stellar_object.radius,
        discovered_on: wiki.stellar_object.discovered_on,
        discovered_by: wiki.stellar_object.discovered_by,
        image: wiki.stellar_object.image,
        }
        setWiki(response_object)
    });
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
        updateStellarObject({
        id: stellarObjectId,
        userId: userId,
        name: wiki.name,
        description: wiki.description,
        mass: wiki.mass,
        radius: parseInt(wiki.radius),
        discovered_on: wiki.discovered_on,
        discovered_by: wiki.discovered_by,
        image: currentPicture
      }).then(() => history.push(`/wiki/${stellarObjectId}`));
    } else {
      window.alert("Please fill in all form fields before submitting.");
      setIsLoading(false);
    }
  };

  const handleControlledInputChange = (event) => {
    const newWiki = { ...wiki };
    newWiki[event.target.name] = event.target.value;
    setWiki(newWiki);
  };

  return (
    <>
      <h1 className="goldenRodText center">Edit Wiki</h1>

      <form className="flex wikiForm">

        <fieldset className="editWikiField">
          <div className="center posts  blueText">
            <label htmlFor="name">Name:</label>
            <input
              value={wiki.name}
              type="name"
              id="name"
              name="name"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>


        <fieldset className="editWikiField">
          <div className="center posts  blueText">
            <label htmlFor="mass">Mass:</label>
            <input
              value={wiki.mass}
              type="mass"
              id="mass"
              name="mass"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset className="editWikiField">
          <div className="center posts  blueText">
            <label htmlFor="radius">Radius(Whole Number in Miles):</label>
            <input
              value={wiki.radius}
              type="radius"
              id="radius"
              name="radius"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset className="editWikiField">
          <div className="center posts  blueText">
            <label htmlFor="discovered_by">Discovered By:</label>
            <input
              value={wiki.discovered_by}
              type="discovered_by"
              id="discovered_by"
              name="discovered_by"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset className="editWikiField">
          <div className="center posts  blueText">
            <label htmlFor="discovered_on">Discovered On (yyyy-mm-dd):</label>
            <input
              value={wiki.discovered_on}
              type="discovered_on"
              id="discovered_on"
              name="discovered_on"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset className="editWikiField">
          <div className="center posts blueText">
            <label className="image_left"htmlFor="image">Image:</label>
						<input
							type="file"
							id="image_url"
							className="postFormField"
							onChange={createPostImageString}
						/>
          </div>
				</fieldset>

        <fieldset className="descriptionWikiField">
          <div className="center posts blueText textArea">
            <label htmlFor="description">Description:</label>
            <textarea
              cols="40"
              rows="5"
              value={wiki.description}
              type="description"
              id="description"
              name="description"
              className="center  post blueText"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <button
          className="center post blueText"
          disabled={isLoading}
          onClick={(event) => {
            setIsLoading(true);
            event.preventDefault();
          }}
        >
          Update Wiki
        </button>
      </form>
    </>
  );
};