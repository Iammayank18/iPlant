import ProfleTypes from "./types";

const ProfileReducer = (state = [], action) => {
  switch (action.type) {
    case ProfleTypes.FETCH_UPDATED_PROFILE:
      return {
        ...state,
        profile: [],
        ProfleTypesLoader: true,
      };

    case ProfleTypes.SET_UPDATED_PROFILE:
      return {
        ...state,
        profile: action.payload,
        ProfleTypesLoader: false,
      };

    // USER PROFILE DATA
    case ProfleTypes.FETCH_USER_PROFILE_DATA:
      return {
        ...state,
        profileData: [],
        ProfleDataLoader: true,
      };

    case ProfleTypes.SET_USER_PROFILE_DATA:
      return {
        ...state,
        profileData: action.payload,
        ProfleDataLoader: false,
      };

    // UPDATE USER PROFILE PHOTO
    case ProfleTypes.FETCH_UPDATED_PROFILE_PHOTO:
      return {
        ...state,
        profilePhotoRes: [],
        profilePhotoResLoader: true,
      };

    case ProfleTypes.SET_UPDATED_PROFILE_PHOTO:
      return {
        ...state,
        profilePhotoRes: action.payload,
        profilePhotoResLoader: false,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
