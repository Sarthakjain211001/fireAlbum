import React from 'react'
import { useState} from 'react'
import ProgressBar from './ProgressBar';
const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const allowedTypes= ['image/png', 'image/jpeg', 'image/jpg'];  //We have to define which types can be allowed . User should not be able to upload any video , pdf...  .Only images should be allowed

    const changeHandler =(e)=>{
        let selected = e.target.files[0];   //some selectors allow us to choose multiple files. So files property returns an array. But here in our project we are imlpementing the selector which can choose only one file
        
        if(selected && allowedTypes.includes(selected.type)){          //If selected is not null and it's type is included in allowedTypes array then olny setFile
            setFile(selected);
            setError("");
        }else{
            setFile(null);
            selected = null;
            setError("Please select an image file (png, jpg or jpeg)");
        }
    }

    return (
        <form>
          <label>
          <input type='file' onChange={changeHandler}/>
          <span>+</span>
          </label>
          <div className='output'>
              {error && <div className='error'> {error}</div>}
              {file && <div>{file.name}</div>}
              {file && <ProgressBar file={file} setFile={setFile}/>}
          </div>
        </form>
    )
}

export default UploadForm
