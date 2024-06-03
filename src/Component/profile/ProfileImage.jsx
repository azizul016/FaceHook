import { useRef } from "react";
import { useProfile } from "../../hook/useProfile";
import editBtn from "./../../assets/icons/edit.svg";
import avatar_1 from "./../../assets/images/avatars/avatar_1.png";
import { api } from "../../Api";
import { actions } from "../../action";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const fileUploaderRef = useRef();
  const handleImageUpload = (e) => {
    e.preventDefault();
    // console.log(fileUploaderRef.current.files, "data");
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={
          state?.user?.avatar
            ? `${import.meta.env.VITE_SERVER_BASE_URL}/${state.user.avatar}`
            : avatar_1
        }
        alt="sumit saha"
      />

      <form>
        <button
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
        >
          <img src={editBtn} alt="Edit" />
        </button>
        <input type="file" name="file" id="file" ref={fileUploaderRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
