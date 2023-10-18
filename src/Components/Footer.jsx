import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerContent}>
        <p>Copyright Creative Workers</p>
        <ul>
          <li>
            <a href="http://google.com" target="_blank" rel="noreferrer">
              Privacy
            </a>
          </li>
          <li>
            <a href="http://google.com" target="_blank" rel="noreferrer">
              Terms
            </a>
          </li>
          <li>
            <a href="http://google.com" target="_blank" rel="noreferrer">
              Cookies
            </a>
          </li>
          <li>
            <a href="http://google.com" target="_blank" rel="noreferrer">
              More
            </a>
          </li>
        </ul>
        <p>Kissmybutton © 2017</p>
      </div>
    </footer>
  );
}
