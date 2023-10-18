import styles from "./Card.module.css";
import defaultImg from "../assets/images/default_article_image.webp";

export default function Card({ urlToImage, title, content }) {
  return (
    <article className={styles.article}>
      <div className={styles.imgContainer}>
        <img
          src={urlToImage ?? defaultImg}
          alt="article img"
          className={styles.articleImg}
        />
      </div>
      <div className={styles.articleBody}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </article>
  );
}
