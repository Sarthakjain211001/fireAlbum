import { collection, getFirestore, onSnapshot, orderBy, query , where} from "firebase/firestore"
import firebaseApp from "../firebase/config"
import { useState,useEffect } from "react";
import { getAuth } from "firebase/auth";

const useFirestore = (Collection) => {

    const firestore = getFirestore(firebaseApp);
    const collectionRef = collection(firestore, Collection)
    const [data, setData] = useState([])

    useEffect(() => {
        // const uid = localStorage.getItem('userId');
        const auth = getAuth();
        const uid = auth.currentUser.uid
        const q = query(collectionRef, where('uid','==',uid), orderBy("createdAt", 'desc'));
        const unsub = onSnapshot(q, (snapshot)=>{
             let documents=[];
             snapshot.docs.forEach((doc)=>{
                 documents.push({...doc.data(), id: doc.id})
             })
             setData(documents);
        });
        return()=>unsub();
    }, [Collection])

    return { data };
}

export default useFirestore