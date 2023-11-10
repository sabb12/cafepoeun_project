"use client";

import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";

export default function Create() {
  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"} />
      <div className={styles.bodyContainer}>
        <div className={styles.wrapper}>
          <div className={`${styles.nameContainer} ${styles.header}`}>
            <div className={styles.list}>상품명</div>
            <input className={styles.inputStyle} type="text" />
          </div>
          <div className={`${styles.priceContainer} ${styles.header}`}>
            <div className={styles.list}>가격</div>
            <input className={styles.inputStyle} type="number" />
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageList}>이미지</div>
            <img
              src=""
              alt=""
              style={{
                width: 100,
                height: 100,
                border: "1px solid red",
              }}
            />
            <input className={styles.fileInputStyle} type="file" />
          </div>
          <div className={styles.buttonsContainer}>
            <button>취소</button>
            <button>저장</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
