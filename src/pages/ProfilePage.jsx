/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useProfile } from "../hook/useProfile";
import { useAuth } from "../hook/useAuth";
import useAxios from "../hook/useAxios";
import { actions } from "../action";
import ProfileInfo from "../Component/profile/ProfileInfo";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        // console.log(response, "response");
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: actions.profile.DATA_FETCH_ERROR });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }
  return (
    <>
      <ProfileInfo />
    </>
  );
};

export default ProfilePage;
