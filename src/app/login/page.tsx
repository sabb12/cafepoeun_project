/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

// const {Kakao} = window;

export default function Login() {
  const grant_type = "https://kauth.kakao.com/oauth/token";

  useEffect(function () {
    const params = new URL(location.toString()).searchParams;
    const code = params.get("code");
    console.log("code: ", code);
    if (code) {
      localStorage.setItem("kakaoCode", code);
    }
  }, []);

  // const client_id = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
  // const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
  const REST_API_KEY = "5f0f40121208712bb0ce30b602d07efb";
  const REDIRECT_URI = "http://localhost:3000/login";

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log("url: ", kakaoUrl);
  // 페이지가 rendering 될 때
  // URL에 query 파람에 code가 있으면
  // 로그인 판단
  // 없으면
  // 비로그인

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
          <div className={styles.hr}></div>
          <div className={styles.loginTitle}>간편로그인</div>
          <div className={styles.hr}></div>
        </div>
        <div className={styles.registerOption}>
          <div
            className={`${styles.kakotalk}${styles.sigintype}`}
            onClick={function () {
              window.location.href = kakaoUrl;
            }}
          >
            <img
              src="/images/kakaotalk_logo.png"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className={`${styles.google}${styles.sigintype}`}>
            <img
              src="/images/google_logo.png"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className={`${styles.naver}${styles.sigintype}`}>
            <img
              src="/images/naver_logo.png"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className={`${styles.apple}${styles.sigintype}`}>
            <img
              src="/images/apple_logo.png"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className={`${styles.apple}${styles.sigintype}`}>
            <img
              src="/images/github_logo.png"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
