import { useEffect, useReducer, useState } from "react";
import { postInitialState, postReducer } from "../reducers/PostReducer";
import { actions } from "../action";
import PostList from "../Component/posts/PostList";
import useAxios from "../hook/useAxios";
import { usePost } from "../hook/usePost";
import NewPost from "../Component/posts/NewPost";

function HomePage() {
  const { api } = useAxios();
  // const [state, dispatch] = useReducer(postReducer, postInitialState);
  const { state, dispatch } = usePost();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error, "home page error");
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
  }, []);

  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> Error in fatching posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
}

export default HomePage;
