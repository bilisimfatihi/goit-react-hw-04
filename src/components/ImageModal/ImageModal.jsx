import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <p className={styles.info}>
        <strong>Yazar:</strong> {image.user.name} <br />
        <strong>Beğeni:</strong> {image.likes}
      </p>
    </Modal>
  );
};

export default ImageModal;
