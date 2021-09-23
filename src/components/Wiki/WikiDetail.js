import React, { useContext, useEffect, useState } from "react";
import { WikiContext } from "./WikiProvider";
import { useParams, useHistory } from "react-router-dom";

export const WikiDetail = () => {
  const { getStellarObjectById, deleteStellarObject, checkIfStaff } =
    useContext(WikiContext);
  const [stellarObject, setStellarObject] = useState({});

  const history = useHistory();

  const { stellarObjectId } = useParams();

  useEffect(() => {
    if (stellarObjectId) {
      getStellarObjectById(stellarObjectId).then(setStellarObject);
    } else {
      return;
    }
  }, [stellarObjectId]);

  const handleDeletePost = (stellarObjectId) => {
    deleteStellarObject(stellarObjectId);
  };

  const handleUpdatePost = (stellarObjectId) => {
    history.push(`/wiki/edit/${stellarObjectId}`);
  };

  const editPostButton = () => {
      return <button
      className="post blueText"
      id={`post--${stellarObjectId}`}
      onClick={(event) => {
        event.preventDefault();
        handleUpdatePost(stellarObjectId);
      }}
    >
      Edit Post
    </button>
  }

  const DeletePostButton = () => {
    const [is_staff, set_is_staff] = useState(false);

    useEffect(() => {
      checkIfStaff().then((res) => set_is_staff(res.is_staff));
    }, []);

    if (is_staff === true) {
      return (
        <button
          className="post blueText"
          id={`post--${stellarObjectId}`}
          onClick={(event) => {
            event.preventDefault();
            handleDeletePost(stellarObjectId);
            history.push(`/`)
          }}
        >
          Delete Post
        </button>
      );
    } else {
      return <> </>;
    }
  };

  const dwarfPlanetChecker = () => {
    const test = stellarObject.is_dwarf
    
    if (test === true) {
      return <div className="blueText">Dwarf Planet: True</div>
    }
    else if (test === false) {
      return <div className="blueText">Dwarf Planet: False</div>
    }
    else {
      return null
    }
  }

  console.log(stellarObject?.is_dwarf)
  return (
    <section className="post center scaleWidth">
      <h1 className="mintText">{stellarObject.stellar_object?.name}</h1>

      <div className="blueText">
			  <img className="stellarObjectPhoto" src={stellarObject.stellar_object?.image} />
			</div>
    
      <div className="blueText description">
        {stellarObject.stellar_object?.description}
      </div>
      {stellarObject.star?.stellar_object.name ? (
        <div className="blueText">
          Parent Star: {stellarObject.star.stellar_object?.name}
        </div>
      ) : null}
      {stellarObject.planet?.stellar_object.name ? (
        <div className="blueText">
          Parent Planet: {stellarObject.planet.stellar_object?.name}
        </div>
      ) : null}
      {dwarfPlanetChecker()}
      {stellarObject.gravity ? (
        <div className="blueText">
          Gravity: {stellarObject.gravity} M/s<sup>2</sup>
        </div>
      ) : null}
      {stellarObject.orbital_period ? (
        <div className="blueText">
          Orbital Period: {stellarObject.orbital_period}
        </div>
      ) : null}
      {stellarObject.star_type?.type ? (
        <div className="blueText">
          Spectral Class: {stellarObject.star_type.type}
        </div>
      ) : null}
      {stellarObject.luminosity ? (
        <div className="blueText">
          Luminosity (Compared to The Earths Sun): {stellarObject.luminosity}
        </div>
      ) : null}
      <div className="blueText">Mass: {stellarObject.stellar_object?.mass}</div>
      <div className="blueText">
        Radius: {stellarObject.stellar_object?.radius} Miles
      </div>
      <div className="blueText">
        Discovered On: {stellarObject.stellar_object?.discovered_on}{" "}
      </div>
      <div className="blueText">
        Discovered By: {stellarObject.stellar_object?.discovered_by}{" "}
      </div>
      <DeletePostButton />
      {editPostButton()}
    </section>
  );
};
