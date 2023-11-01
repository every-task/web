import Editor from "../component/post/Editor"
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { api } from "../network/api";
import { useEffect } from "react";



const Post = () => {


    const getUploadKey = async () => {

        const keys = await api('api/vi/firebase', 'GET')

        const auth = getAuth();

        signInWithCustomToken(auth, keys)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });


    }

    useEffect(() => {

        getUploadKey()

    }, [])


    return <>

        <form>




        </form>



    </>

}

export default Post