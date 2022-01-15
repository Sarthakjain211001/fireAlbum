import React , {useState} from 'react';
import Title from '../components/Title';
import ImageGrid from '../components/ImageGrid';
import Modal from '../components/Modal';
import UploadForm from '../components/UploadForm';

function Home({currUser, setCurrUser}) {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="Home">
      <Title  setCurrUser={setCurrUser}/>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </div>
  );
}

export default Home;
