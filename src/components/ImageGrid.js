import React , {useEffect} from 'react'
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion'

const ImageGrid = ({setSelectedImg }) => {
    
  
  const { data} = useFirestore("images")    //useFirestore function will return the data fetched from the firestore

    return (
      
        <div className='img-grid'>
          
           { data && data.map((item)=>(
              <motion.div 
              className='img-wrap' 
              key={item.id} 
              onClick={()=>{
                  setSelectedImg(item);  
                }}
              layout
              whileHover={{opacity: 1}}
              >
                <motion.img src={item.Url} alt="uploaded image"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
                />
            </motion.div>                    
           ))}       
        </div>
    )
}

export default ImageGrid
