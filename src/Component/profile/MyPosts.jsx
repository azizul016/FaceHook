import { useProfile } from "../../hook/useProfile";
import PostList from "../posts/PostList";

const MyPosts = () => {
  const { state } = useProfile();
  // console.log(state, "state");
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={state?.posts} />
    </>
  );
};

export default MyPosts;
