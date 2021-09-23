import { WikiContext } from "./WikiProvider";
import React, { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Wiki.css";

export const WikiList = () => {
  const { getStellarObjects, stellarObjects } = useContext(WikiContext);
  const history = useHistory();

  useEffect(() => {
    getStellarObjects();
  }, []);

  return (
    <>
      <h1 className="goldenRodText center">Recent Articles</h1>

      <button
        className="create__button"
        onClick={() => history.push("/wiki/create")}
      >
        Create New Wiki
      </button>
      <div className="grid">
      {stellarObjects.map((stellarObject) => (
        <section className="posts">
          <article className="post" id={`stellarObject--${stellarObject.id}`}>
            <div className="blueText objectTitle">
              <Link to={"/wiki/" + stellarObject.id}>{stellarObject.name}</Link>
            </div>
            <div className="blueText">Mass: {stellarObject.mass}</div>
            <div className="blueText">Radius: {stellarObject.radius} Miles</div>
          </article>
        </section>
      ))}
      </div>
    </>
  );
};
