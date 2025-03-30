import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  updateProfile(user, {
    displayName: user.displayName       // Gets the photo from Google account
  })
  .then(() => {
    console.log("Profile updated with Google data!");
  })
  .catch((error) => {
    console.error("Error updating profile:", error.message);
  });
} else {
  console.log("No user is currently logged in.");
}
