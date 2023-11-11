import styles from "./page.module.css";

export default function TestPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{"header"}</div>
      <div className={styles.body}>{"body"}</div>
      <div className={styles.footer}>{"footer"}</div>
    </div>
  );
}
