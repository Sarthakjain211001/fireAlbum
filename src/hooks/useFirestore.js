import { collection, getFirestore, onSnapshot, orderBy, query , where} from "firebase/firestore"
import firebaseApp from "../firebase/config"
import { useState,useEffect } from "react";
import { getAuth } from "firebase/auth";

const useFirestore = (Collection) => {

    const firestore = getFirestore(firebaseApp);
    const collectionRef = collection(firestore, Collection)
    const [data, setData] = useState([])

    useEffect(() => {
        document.getElementById("Loader").style.display="block";  //When fetching the data starts then show the loader
        const auth = getAuth();
        const uid = auth.currentUser.uid   //getting the id of the current user
        const q = query(collectionRef, where('uid','==',uid), orderBy("createdAt", 'desc'));   //getting the desired data from the firestore
        
        const unsub = onSnapshot(q, (snapshot)=>{   //onSnapshot function returns unsubscibe which is used for unsubscribing from listening to the changes in firestore
             let documents=[]; 
             snapshot.docs.forEach((doc)=>{
                 documents.push({...doc.data(), id: doc.id })  //doc.data() = {Url, uid, createdAt, name}
             })             
             setData(documents);
             document.getElementById("Loader").style.display="none";  //When fetching is complete then disappear the loader
        });
        return()=>unsub();    //When the page is closed or the user goes to some other link i.e when the component gets unmounted then unsubscribe 
    }, [Collection])

    return { data };
}

export default useFirestore