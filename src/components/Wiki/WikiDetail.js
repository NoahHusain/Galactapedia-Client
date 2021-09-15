import React, { useContext, useEffect, useState } from "react";
import { WikiContext } from "./WikiProvider";
import { useParams, useHistory } from "react-router-dom";

export const WikiDetail = () => {
  const { getStellarObjectById } = useContext(WikiContext);
  const [stellarObject, setStellarObject] = useState({});

  const history = useHistory();

  const { stellarObjectId } = useParams();

  useEffect(() => {
    if (stellarObjectId) {
      getStellarObjectById(stellarObjectId).then(setStellarObject);
    } else {
      getStellarObjectById(Math.floor(Math.random() * 5) + 1).then(
        setStellarObject
      );
    }
  }, []);

  return (
    <section className="post center">
      <h1 className="goldenRodText">{stellarObject.name}</h1>
      <div className="blueText">{stellarObject.description}</div>
      <div className="blueText">Mass: {stellarObject.mass}</div>
      <div className="blueText">Radius: {stellarObject.radius} </div>
      <div className="blueText">
        Discovered On: {stellarObject.discovered_on}{" "}
      </div>
      <div className="blueText">
        Discovered By: {stellarObject.discovered_by}{" "}
      </div>
    </section>
  );
};
