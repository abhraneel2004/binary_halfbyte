// src/utils/updateUserProfile.js
import { getAuth, updateProfile } from "firebase/auth";

export const updateUserProfile = async (displayName, photoURL) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  } else {
    console.log("No user is currently logged in.");
  }
};
