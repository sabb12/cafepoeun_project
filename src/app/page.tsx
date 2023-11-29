/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header showSearch={false} showCart={false} />
      <div className={styles.bodyContainer}>
        <div className={styles.imageContainer}>
          <img src="/images/mainImage.png" alt="" style={{ width: "600px" }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
