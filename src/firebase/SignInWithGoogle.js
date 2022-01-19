import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseApp from "./config";

const auth = getAuth(firebaseApp);

export const SignInWithGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then().catch((err)=>{});
}