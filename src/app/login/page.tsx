/* eslint-disable @next/next/no-img-element */
"use client";

import i18n from "@/i18n/locale";
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
  // const REST_API_KEY = "5f0f40121208712bb0ce30b602d07efb";
  // const REDIRECT_URI = window.location.origin;

  // // local로 들어 갈 때
  // // http://localhost:3000 연결
  // // cafepoeun-project.vercel.app로 들어 갈 때
  // // https://cafepoeun-project.vercel.app/ 연결

  // const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // console.log("url: ", kakaoUrl);
  // 페이지가 rendering 될 때
  // URL에 query 파람에 code가 있으면
  // 로그인 판단
  // 없으면
  // 비로그인

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginInnerWrapper}>
        <div className={styles.loginContainer}>
          {/* <div className={styles.closeButton}>&times;</div> */}
          <div className={styles.title}>카페포은</div>
          <div className={styles.inputandButton}>
            <div className={styles.inputWrapper}>
              <div className={`${styles.inputContainer} ${styles.emailInput}`}>
                <div className={styles.circleContainer}>
                  <div className={styles.circle}></div>
                  <div className={styles.halfCircle}></div>
                </div>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Username"
                />
              </div>
              <div
                className={`${styles.inputContainer} ${styles.passwordInput}`}
              >
                <div className={styles.circleContainer}>
                  <div className={styles.halfUCircle}></div>
                  <div className={styles.lockCircle}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.verticalLine}></div>
                </div>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Password"
                />
              </div>
            </div>
            <button className={styles.button}>{i18n.t("logIn")}</button>
          </div>
          <div className={styles.options}>
            <div className={`${styles.findID}${styles.option}`}>
              {i18n.t("ForgotYourEmail")}
            </div>
            {"|"}
            <div className={`${styles.findPW}${styles.option}`}>
              {i18n.t("ForgotYourPassword")}
            </div>
            {"|"}
            <div className={`${styles.register}${styles.option}`}>
              {i18n.t("register")}
            </div>
          </div>
          <div className={styles.loginOptions}>
            <div className={styles.hr}></div>
            <div className={styles.loginTitle}>{i18n.t("register")}</div>
            <div className={styles.hr}></div>
          </div>
          <div className={styles.registerOption}>
            <div
              className={`${styles.kakotalk} ${styles.sigintype}`}
              onClick={function () {
                const REST_API_KEY = "5f0f40121208712bb0ce30b602d07efb";
                const REDIRECT_URI = `${window.location.origin}/kakao-login`;
                const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

                window.location.href = kakaoUrl;
                // localHost = https://localHost:3000/kakao-login
                // 배포경우 = https://cafepoeun-project.vercel.app/kakao-login
              }}
            >
              <img
                src="/images/kakaotalk_logo.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div className={`${styles.google} ${styles.sigintype}`}>
              <img
                src="/images/google_logo.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div className={`${styles.naver} ${styles.sigintype}`}>
              <img
                src="/images/naver_logo.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div className={`${styles.apple} ${styles.sigintype}`}>
              <img
                src="/images/apple_logo.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>

            <div className={`${styles.apple} ${styles.sigintype}`}>
              <img
                src="/images/github_logo.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.copyrightContainer}>
          <div className={styles.copyrightTitle}>카페포은</div>
          <div className={styles.copyrightReserved}>
            Copyright © CAFEPOEUN Corp. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
