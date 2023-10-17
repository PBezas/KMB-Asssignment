import styles from "./Card.module.css";
import defaultImg from "../assets/images/default_article_image.webp";

export default function Card({ urlToImage, title, content }) {
  return (
    <article className={styles.article}>
      <img
        src={urlToImage ?? defaultImg}
        alt="article img"
        className={styles.articleImg}
      />
      <div className={styles.articleBody}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </article>
  );
}
