import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";

const handleImageUpload = async (user, image) => {
  if (image) {
    const storage = getStorage();
    const imagesRef = ref(storage, `profiles/${user.id}/image`);

    const profileImageUrl = await uploadBytes(imagesRef, image).then(
      async () => await getDownloadURL(imagesRef)
    );

    return profileImageUrl;
  }
};

export default handleImageUpload;
