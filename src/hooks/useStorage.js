import { useState, useEffect } from "react";
import firebaseApp from "../firebase/config"
import { getStorage , ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore"
import { getAuth } from "firebase/auth";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    
 
useEffect(() => {   //We want this code to run every time the value of the file changes. So we are writing it in useEffect and giving file as dependency
    //Reference
    const storage = getStorage(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storageRef = ref(storage, file.name);  // create a reference with the file.name
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(firestore, "images");
    const auth = getAuth();
    console.log("hello", auth.currentUser)   
    uploadTask.on('state_changed', 
         (snapshot) => {
           let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log(percentage);
           setProgress(percentage);
         }, 
         (error) => {
           setError(error)
         }, 
         async () => {
            const Url = await getDownloadURL(uploadTask.snapshot.ref)
            console.log("download url:", Url);
            setUrl(Url);
            const createdAt = serverTimestamp();
            if(auth.currentUser) {const uid = auth.currentUser.uid;
            addDoc(collectionRef, {Url, createdAt, uid});}
           }
        );
}, [file]) ;

return {progress, url, error}
}

export default useStorage;