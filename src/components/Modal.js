import React from 'react'
import { motion } from 'framer-motion';
import { collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';

import firebaseApp from '../firebase/config';

const Modal = ({selectedImg, setSelectedImg, selectedImgId}) => {

const handleClick = (e)=>{
    if(e.target.classList.contains('backdrop')){
        setSelectedImg(null);
    }
}
const firestore = getFirestore(firebaseApp)

const handleDelete =(e)=>{
    const docref= doc(firestore, 'images', selectedImgId);
    deleteDoc(docref).then(()=>{
        document.getElementById('Backdrop').click();
    })
}


    return (
        <motion.div className='backdrop' id="Backdrop" onClick={handleClick}
        initial={{opacity: 0}}
        animate = {{opacity: 1}}
        >
            <motion.img src={selectedImg} alt="enlarged img"
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
