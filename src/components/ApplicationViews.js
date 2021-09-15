import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./Posts/PostProvider";
import { PostList } from "./Posts/PostList";
import { PostEdit } from "./Posts/PostEdit";
import { PostForm } from "./Posts/PostForm";


export const ApplicationViews = () => {
  return (
    <>
      <PostProvider>
              <Route exact path="/">
                <PostList />
              </Route>

              <Route exact path="/posts/create">
                <PostForm />
              </Route>

              <Route exact path="/posts/edit/:postId(\d+)">
                <PostEdit />
              </Route>
      </PostProvider>
    </>
  );
};
