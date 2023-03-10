import { useState, useEffect } from 'react'
import fetchImage from "servises/FetchApi";
import SearchBar from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from "components/Button/Button"
import { Loader } from './Loader/Loader';
import { Toaster, toast } from "react-hot-toast";
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getImages() {
      if (!imageName) return;
      try {
        setStatus(Status.PENDING);
        const newImages = await fetchImage(imageName, page);

        if (!imageName.trim() || !newImages.length) {
          setStatus(Status.REJECTED);
          return toast.error(`no picture with name ${imageName}`);
        }
        setImages(prev => [...prev, ...newImages]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        return toast.error('smt going wrong');
      }
    }
    getImages();
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  }
  const handleBtnClick = () => {
    setPage(prev =>
      (prev + 1)
    )
  }
  const toogleModal = (largeImageURL, imgTags) => {
    setShowModal(prev => !prev);
    setImgTags(imgTags);
    setLargeImageUrl(largeImageURL);
  }

  return (<Container >
    <Toaster position='top-right'
      toastOptions={{
        duration: 1500,
      }} />
    <SearchBar onSubmit={handleFormSubmit} />
    {status === Status.PENDING && <Loader />}
    <ImageGallery images={images} onClick={toogleModal} />
    {!images.length || (<Button onClick={handleBtnClick} />)}
    {showModal && <Modal onClose={toogleModal} src={largeImageURL} alt={imgTags} />}
  </Container >)
}

