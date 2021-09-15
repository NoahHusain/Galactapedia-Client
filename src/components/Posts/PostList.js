import { PostContext } from "./PostProvider";
import React, { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Post.css";

export const PostList = () => {
  const { getStellarObjects, stellarObjects } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getStellarObjects();
  }, []);

//   const handleDeletePost = (wikiId) => {
//     deletePost(wikiId);
//   };

//   const handleUpdatePost = (wikiId) => {
//     console.log(wikiId);
//     history.push(`/posts/edit/${wikiId}`);
//   };

  return (
    <>
      <h1 className="goldenRodText center">Recent Articles</h1>

      <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
      >
        Create New Wiki
      </button>

      {stellarObjects.map((stellarObject) => (
        <section className="posts">
          <article className="post" id={`stellarObject--${stellarObject.id}`}>
            <div className="blueText"><a >{stellarObject.name}</a></div>
            <div className="blueText">Mass: {stellarObject.mass}</div>
            <div className="blueText">Radius: {stellarObject.radius}</div>
            
          </article>
        </section>
      ))}
    </>
  );
};






