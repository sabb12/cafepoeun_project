"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Login() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.closeButton}>&times;</div>
        <div className={styles.title}>카페포은</div>
        <div className={styles.inputandButton}>
          <input type="text" className={styles.input} />
          <input type="text" className={styles.input} />
          <button className={styles.button}>로그인</button>
        </div>
        <div className={styles.options}>
          <div className={`${styles.findID}${styles.option}`}>
            아이디(이메일)찾기
          </div>
          {"|"}
          <div className={`${styles.findPW}${styles.option}`}>
            비밀번호 찾기
          </div>
          {"|"}
          <div className={`${styles.register}${styles.option}`}>회원가입</div>
        </div>
        <div className={styles.loginOptions}>
          <span className={styles.loginTitle}>간편로그인</span>
        </div>
        <div className={styles.registerOption}>
          <div className={`${styles.kakotalk}${styles.sigintype}`}>
            카카오톡
          </div>
          <div className={`${styles.google}${styles.sigintype}`}>구글</div>
          <div className={`${styles.naver}${styles.sigintype}`}>네이버</div>
          <div className={`${styles.apple}${styles.sigintype}`}>애플</div>
        </div>
      </div>
    </div>
  );
}
