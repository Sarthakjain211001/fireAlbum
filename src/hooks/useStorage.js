import { useState, useEffect } from "react";
import firebaseApp from "../firebase/config"
import { getStorage , ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { v4 as uuidv4} from 'uuid'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    
 
useEffect(() => {   //We want this code to run every time the value of the file changes. So we are writing it in useEffect and giving file as dependency
    //Reference
    const storage = getStorage(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    //***  const storageRef = ref(storage, file.name);  // create a reference with the file.name
    //***  use uuid in place of file.name . So that each image will be saved with a unique name

    const name = uuidv4()       //uuidv4() ... for creating a unique id for every image. We will use this unique id as the name of the mage while storing it in firebase storage.
    const storageRef = ref(storage, name);     
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(firestore, "images");
    const auth = getAuth();
    
    uploadTask.on('state_changed', 
         (snapshot) => {
           let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;   //percentage of the image uploaded
           setProgress(percentage);   //setting progress to show the progress bar
         }, 
         (error) => {
           setError(error)
         }, 
         async () => {
            const Url = await getDownloadURL(uploadTask.snapshot.ref)    //get the downloadUrl from the reference of the uploaded image
            
            setUrl(Url);
            const createdAt = serverTimestamp();   //getting the present time . In firebase we have to use serTimestamp() instead of Date()
            if(auth.currentUser) {
              const uid = auth.currentUser.uid;
              addDoc(collectionRef, {Url, createdAt, uid, name});}  //creating the document with properties Url, createdAt, uid, name in firestore. name is kept so that it can be used for deleting the image from the storage.
           }
        );
}, [file]) ;

return {progress, url, error}
}

export default useStorage;