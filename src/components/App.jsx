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
        setImages([...images, ...newImages]);
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

// export default class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     status: Status.IDLE,
//     page: 1,
//     error: null,
//     largeImageURL: '',
//     imgTags: '',
//     showModal: false,
//   }

//   async componentDidUpdate(_, prevState) {
//     const { imageName, page } = this.state;
//     if (prevState.imageName !== imageName || prevState.page !== page) {
//       try {
//         this.setState({ status: Status.PENDING });
//         const newImages = await fetchImage(imageName, page);
//         if (!imageName.trim() || !newImages.length) {
//           this.setState({ status: Status.REJECTED });
//           return toast.error(`no picture with name ${imageName}`);
//         }
//         this.setState({
//           images: [...this.state.images, ...newImages],
//           status: Status.RESOLVED
//         });
//       } catch (error) {
//         this.setState({ status: Status.REJECTED });
//         return toast.error('smt going wrong');
//       }
//     }
//   }
//   handleFormSubmit = imageName => {
//     this.setState({ imageName, page: 1, images: [] })
//   }

//   handleBtnClick = () => {
//     this.setState(prevState =>
//       ({ page: prevState.page + 1 })
//     )
//   }
//   toogleModal = (largeImageURL, imgTags) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//     this.setState({ largeImageURL, imgTags });
//   }
//   render() {
//     const { images, status, showModal, largeImageURL, tags } = this.state;
//     return (
//       <Container >
//         <Toaster position='top-right'
//           toastOptions={{
//             duration: 1500,
//           }} />
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         {status === Status.PENDING && <Loader />}
//         <ImageGallery images={images} onClick={this.toogleModal} />
//         {!images.length || (<Button onClick={this.handleBtnClick} />)}
//         {showModal && <Modal onClose={this.toogleModal}><img src={largeImageURL} alt={tags} /></Modal>}
//       </Container >

//     )
//   }
// }

