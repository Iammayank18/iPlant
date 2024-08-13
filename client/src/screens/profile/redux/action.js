import ProfileTypes from "./types";

const fetchUpdateProfile = (data) => {
  return {
    type: ProfileTypes.FETCH_UPDATED_PROFILE,
    payload: data,
  };
};
const setUpdateProfile = (data) => {
  return {
    type: ProfileTypes.SET_UPDATED_PROFILE,
    payload: data,
  };
};

const fetchUserProfileData = (data) => {
  return {
    type: ProfileTypes.FETCH_USER_PROFILE_DATA,
    payload: data,
  };
};
const setUserProfileData = (data) => {
  return {
    type: ProfileTypes.SET_USER_PROFILE_DATA,
    payload: data,
  };
};

const fetchUserUpdateProfilePhoto = (data) => {
  return {
    type: ProfileTypes.FETCH_UPDATED_PROFILE_PHOTO,
    payload: data,
  };
};
const setUserUpdateProfilePhoto = (data) => {
  return {
    type: ProfileTypes.SET_UPDATED_PROFILE_PHOTO,
    payload: data,
  };
};

const ProfileAction = {
  fetchUpdateProfile,
  setUpdateProfile,
  fetchUserProfileData,
  setUserProfileData,
  fetchUserUpdateProfilePhoto,
  setUserUpdateProfilePhoto,
};

export default ProfileAction;
