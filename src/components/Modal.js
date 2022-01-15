import React from 'react'
import { motion } from 'framer-motion';
import {deleteDoc, doc, getFirestore,  } from 'firebase/firestore';
import firebaseApp from '../firebase/config';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const Modal = ({selectedImg, setSelectedImg}) => {

const handleClick = (e)=>{
    if(e.target.classList.contains('backdrop')){          //If the className contains backdrop then setSelectedImg to null. i.e the modal will disappear when we click on outside (i.e on backdrop)
        setSelectedImg(null);
    }
}

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const handleDelete =(e)=>{
    
    const docref_storage = ref(storage, selectedImg.name);  //getting reference to the selectedImg in storage
    
    const docref_firestore= doc(firestore, 'images', selectedImg.id); //getting reference to the selectedImg in firestore

    deleteDoc(docref_firestore).then(()=>{   //deleting the selectedImg from firestore

    })

    deleteObject(docref_storage).then(()=>{   //deleting the selectedImg from storage
        document.getElementById('Backdrop').click();       //Clicking on the backdrop programatically
    })
}


    return (
        <motion.div className='backdrop' id="Backdrop" onClick={handleClick}
        initial={{opacity: 0}}
        animate = {{opacity: 1}}
        >
            <motion.img src={selectedImg.Url} alt="enlarged img"
            initial={{y: "-100vh"}}
            animate={{y: 0}}
            />
            <div className='btncenter'>
            <button className='delete' onClick={handleDelete}>Delete</button>            
            </div>
        </motion.div>
    )
}

export default Modal
