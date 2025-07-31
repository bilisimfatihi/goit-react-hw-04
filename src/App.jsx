import "./App.css";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";

import { fetchImages } from "./services/api";

Modal.setAppElement("#root");

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query === "") return;

    const getImages = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchImages(query, page);

        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prev) => [...prev, ...data.results]);
        }

        setTotalPages(Math.ceil(data.total / 12));
      } catch (err) {
        setError("Görseller alınamadı. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => setPage((prev) => prev + 1);

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      {loading && <Loader />}
      <ImageModal
        isOpen={modalImage !== null}
        onClose={closeModal}
        image={modalImage}
      />
    </div>
  );
}

export default App;
