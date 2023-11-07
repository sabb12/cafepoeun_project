import { useState } from "react";
import styles from "./MenuModal.module.css";

export default function MenuModal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.closeButton}>&times;</div>
      <div className={styles.title}>커피</div>
      <div className={styles.information}></div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>수정</button>
      </div>
    </div>
  );
}
