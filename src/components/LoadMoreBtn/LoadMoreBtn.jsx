import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} className={styles.button}>
        Daha Fazla Yükle
      </button>
    </div>
  );
};

export default LoadMoreBtn;
