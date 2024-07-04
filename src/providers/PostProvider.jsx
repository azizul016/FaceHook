/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { PostContext } from "../context";
import { postInitialState, postReducer } from "../reducers/PostReducer";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, postInitialState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
