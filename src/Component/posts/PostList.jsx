/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {/* <PostCard post={"post"} /> */}

      {!!posts && posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
