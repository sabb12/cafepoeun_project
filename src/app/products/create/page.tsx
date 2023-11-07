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
        <div className={styles.bodyContent}>
          <div className={styles.title}>상품수정</div>
          <div className={styles.createFormContainer}>
            <div className={styles.idContainer}>
              <div className={styles.heaader}>아이디</div>
              <input type="text" />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.header}>상품명</div>
              <input type="text" />
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.header}>대표이미지</div>
              <div className={styles.imageList}>
                <input
                  style={{
                    width: 100,
                    height: 100,
                    border: "1px solid red",
                  }}
                  type="file"
                />
              </div>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.header}>가격</div>
              <input type="number" />
            </div>
            <div className={styles.createdUpdatedDateContainer}>
              <div className={styles.createdContainer}>
                <div className={styles.header}>생성일</div>
                <div>hi</div>
              </div>
              <div className={styles.updatedDateContainer}>
                <div className={styles.header}>수정일</div>
                <div>bye</div>
              </div>
            </div>
          </div>
          <div className={styles.eventListenerContainer}>
            <button>취소</button>
            <button>저장</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
