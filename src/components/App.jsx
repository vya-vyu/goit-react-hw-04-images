import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';
import getImagesApi from 'servises/imageApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const [page, setPage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };
  const showModalImage = e => {
    setImageURL(e.target.dataset.url);
    setImageAlt(e.target.alt);
    toggleModal();
  };
  const handleFormSubmit = q => {
    setImages([]);
    setSearchName(q);
    setPage(1);
  };

  useEffect(() => {
    if (searchName) {
      const data = async () => {
        setLoading(prev => !prev);
        try {
          const dataImages = await getImagesApi(searchName, page);

          if (dataImages.data.hits.length === 0) {
            throw new Error('No images');
          }
          if (page === 1) {
            toast.success(`Знайдено ${dataImages.data.totalHits} зображень `);
          }
          setImages(prevImages => [...prevImages, ...dataImages.data.hits]);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(prevLoading => !prevLoading);
        }
      };
      data();
    }
  }, [searchName, page]);

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div
      style={{
        // height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize: 40,
        // color: '#010101',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ToastContainer />
      <ImageGallery
        images={images}
        showModalImage={showModalImage}
        changePage={changePage}
      />
      {loading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal} imageUrl={imageURL} imageAlt={imageAlt} />
      )}
    </div>
  );
};
