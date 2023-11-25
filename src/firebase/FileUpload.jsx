import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import { v4 as uuidv4 } from "uuid";

export const handleImageUpload = async (user, image) => {
  if (image) {
    const storage = getStorage();
    const imagesRef = ref(storage, `profiles/${user.id}/image`);

    const profileImageUrl = await uploadBytes(imagesRef, image).then(
      async () => await getDownloadURL(imagesRef)
    );

    return profileImageUrl;
  }
};

export const handlePostImageUpload = async (user, image) => {
  if (image) {
    const today = new Date();

    const storage = getStorage();
    const imagesRef = ref(
      storage,
      `post/${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}/${uuidv4()}`
    );

    const PostImage = await uploadBytes(imagesRef, image).then(
      async () => await getDownloadURL(imagesRef)
    );

    return PostImage;
  }
};

export const getUploadKey = async () => {
  axios.get("/api/v1/auth/firebase").then(getAuthentication);
};

const getAuthentication = ({ data }) => {
  const auth = getAuth();

  signInWithCustomToken(auth, data)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // 수정 예정
    });
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      220,
      220,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      200,
      200
    );
  });
