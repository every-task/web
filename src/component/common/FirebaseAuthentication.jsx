import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const getUploadKey = async () => {
  axios.get("api/v1/auth/firebase").then(getAuthentication);
};
export default getUploadKey;

const getAuthentication = ({ data }) => {
  const auth = getAuth();

  signInWithCustomToken(auth, data)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
};
