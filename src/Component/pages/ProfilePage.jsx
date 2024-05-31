import { useEffect, useState } from "react";
import useAxios from "../../hook/useAxios";
import { useAuth } from "../../hook/useAuth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();
  console.log(auth, "auth");
  console.log(user, "user");
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        console.log(response, "response");
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div>
        Welcome, {user?.firstName} {user?.lastName}
        <p>You have {posts.length} posts.</p>
      </div>
    );
  }
};

export default ProfilePage;
