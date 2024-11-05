import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import { getFriendsList, getProfile, updateUserProfile } from '../../redux/Slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.userData)
  const friendsListData = useSelector((state) => state?.auth?.friendsListData)
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  let formatedUserName = userData?.userName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const [updatedUserData, setUpdatedUserData] = useState({
    userName: formatedUserName || '',
    avatar: null,
    previewImage: userData?.avatar?.secure_url || '',
    userId: userData?._id
  });

  const getImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUpdatedUserData({
          ...updatedUserData,
          avatar: uploadedImage,
          previewImage: this.result
        });
      });
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value
    });
  }

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();

    if (updatedUserData.userName.length < 5) {
      toast.error("Username must be at least 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("userName", updatedUserData.userName);
    if (updatedUserData.avatar) formData.append("avatar", updatedUserData.avatar);  // only append if there’s a new avatar

    const res = await dispatch(updateUserProfile(formData));

    if (res?.payload?.success) {
      await dispatch(getProfile());
      setIsProfileEditable(false);
    }
  };


  return (
    <div className="flex flex-col items-center p-6 flex-[0.65] rounded-[25px] bg-white ">
      <div className="relative flex items-center justify-center w-full mb-4">
        {isProfileEditable && (
          <IconButton
            className="absolute right-72"
            onClick={() => setIsProfileEditable(!isProfileEditable)}
          >
            <Tooltip title="Back to View Profile">
              <KeyboardReturnRoundedIcon />
            </Tooltip>
          </IconButton>
        )}
        <h2 className="text-2xl font-semibold text-blue-600"> {!isProfileEditable ? 'Profile' : 'Edit Profile'}</h2>
      </div>

      <hr className="w-11/12 border-t border-gray-300 opacity-50 mb-4" />

      {
        !isProfileEditable ?
          (
            <div className="flex flex-col items-center justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow-y-auto">

              <div className="flex items-center justify-center">
                <Tooltip title="View Profile">
                  <img
                    src={userData?.avatar?.secure_url}
                    alt="Profile"
                    className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                  />
                </Tooltip>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-700 mb-2 ">
                  <span>
                    {formatedUserName}
                  </span>
                </h3>
                <p className="text-gray-500 mb-1">Email Id: <span>{userData?.email}</span></p>
                <p className="text-gray-500">Phone Number: <span>{userData?.phone}</span></p>
              </div>
              <div className="flex w-full gap-4">
                <button onClick={() => setIsProfileEditable(!isProfileEditable)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg text-sm font-medium w-full">
                  Edit Profile
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-600 py-1 rounded-lg text-sm font-medium w-full">
                  Change Password
                </button>
                <button onClick={() => setShowFriendsList(!showFriendsList)} className="flex-1  bg-green-700 hover:bg-green-800 text-white py-1 rounded-lg text-sm font-medium w-full">
                  {!showFriendsList ? 'Show Friends List' : 'Hide Friends List'}
                </button>

              </div>
            </div>
          )
          :
          (
            <form action="" onSubmit={handleUpdateUserProfile} className="flex flex-col items-center justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow-y-auto">
              <div className="flex items-center justify-center relative">
                <figure>
                  <label htmlFor="image_uploads" className="cursor-pointer flex relative">
                    {updatedUserData.previewImage ? (
                      <img
                        className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                        src={updatedUserData.previewImage}
                        alt="Profile"
                      />
                    ) : (
                      <PersonIcon className="w-32 h-32 object-cover rounded-full border-4 border-blue" />
                    )}

                    {/* Camera Icon Overlay */}
                    <div className="absolute bottom-0 left-16 p-1 rounded-full text-blue">
                      <CameraAltIcon />
                    </div>
                  </label>
                  <input
                    onChange={getImage}
                    className="hidden"
                    type="file"
                    name="image_uploads"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png, .svg"
                  />
                </figure>
              </div>
              <div className="border-2 border-blue-500 rounded-[25px] bg-blue-500 w-80">
                <label htmlFor="Username">
                  <input
                    type="text"
                    id='userName'
                    name='userName'
                    placeholder="Enter Username"
                    className="w-full px-4 py-1  text-base outline-none rounded-[25px]"
                    value={updatedUserData.userName}
                    onChange={handleUserInput}
                  />
                </label>
              </div>
              <div className="flex w-full gap-4">
                <button className="flex-1 bg-blue-500 text-white py-1 rounded-lg text-sm font-medium w-full">
                  Update Profile
                </button>
              </div>
            </form>

          )
      }
<div className='overflow-y-auto'>
      {
        showFriendsList && (
          friendsListData?.map((friend, index) => (
            <ul key={friend?._id || index}>
              <li className='p-2 cursor-pointer hover:bg-gray-300 hover:rounded-[20px]'>
              <div className="flex items-center justify-center gap-2">
                    <img src={friend?.avatar?.secure_url} alt="Contact" className="w-10 h-10 rounded-full" />
                    <div>
                      <h3>
                        {friend?.userName?.split(' ')[0].charAt(0).toUpperCase() + friend?.userName?.split(' ')[0].slice(1).toLowerCase()}
                      </h3>
                    </div>
                  </div>
              </li>
            </ul>
          ))
          )
      }
      </div>

    </div>
  );
};

export default Profile;
