import styles from "./NoResults.module.css";

export default function NoResults({ query }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>No results for &quot;{query}&quot; found</h2>
        <h5>Search help</h5>
        <ul>
          <li>Check your search for typos</li>
          <li>Use more generic search terms</li>
        </ul>
      </div>
    </div>
  );
}
