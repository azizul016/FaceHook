/* eslint-disable react/prop-types */
import timeIcon from "./../../assets/icons/time.svg";
import editIcon from "./../../assets/icons/edit.svg";
import deleteIcon from "./../../assets/icons/delete.svg";
import dotsIcon from "./../../assets/icons/3dots.svg";
import { useAvatar } from "../../hook/useAvatar";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { useState } from "react";

const PostHeader = ({ post }) => {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
          <div className="flex items-center gap-1.5">
            <img src={timeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)} ago`}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <button onClick={() => setShowAction(!showAction)}>
          <img src={dotsIcon} alt="3dots of Action" />
        </button>

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
