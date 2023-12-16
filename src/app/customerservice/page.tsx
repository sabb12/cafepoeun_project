"use client";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./page.module.css";

export default function CustomerService() {
  return (
    <div className={styles.mainPageWrapper}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.introduction}>
            아래 양식에 맞춰 문의 사항을 접수해주세요
          </div>
          <div className={styles.subContainer}>
            <div
              className={`${styles.nameContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.name} ${styles.subject}`}>이름</div>
              <input type="text" className={styles.input} />
            </div>
            <div
              className={`${styles.contactContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.contactNumber} ${styles.subject}`}>
                연락처
              </div>
              <div className={styles.contactInputContainer}>
                <input type="text" className={styles.input} />
                {"-"}
                <input type="text" className={styles.input} />
                {"-"}
                <input type="text" className={styles.input} />
              </div>
            </div>
            <div
              className={`${styles.emailContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.email} ${styles.subject}`}>E-mail</div>
              <div className={styles.emailInputValueContainer}>
                <input
                  type="text"
                  placeholder="이메일"
                  className={styles.input}
                />
                {"@"}
                <input type="text" className={styles.input} />
                <select name="" id="" className={styles.select}>
                  <option value="naver">naver.com</option>
                  <option value="daum">daum.net</option>
                  <option value="hotmail">hotmail.com</option>
                  <option value="gmail">gmail.com</option>
                </select>
              </div>
            </div>
            <div
              className={`${styles.titleContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.title} ${styles.subject}`}>제목</div>
              <input type="text" className={styles.input} />
            </div>
            <div
              className={`${styles.feedbackContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.feedback} ${styles.subject}`}>내용</div>
              <input
                type="text"
                className={`${styles.input} ${styles.feedbackinput}`}
              />
            </div>
            <div
              className={`${styles.imageContainer} ${styles.inputValueContainer}`}
            >
              <div className={`${styles.image} ${styles.subject}`}>
                파일 첨부
              </div>
              <div className={styles.imageDiv}>
                <img src="" />
                <input type="file" className="file" />
                <label htmlFor="file">파일 찾기</label>
              </div>
            </div>
            <div
              className={`${styles.buttonContainer} ${styles.inputValueContainer}`}
            >
              <button className={styles.button}>취소</button>
              <button className={styles.button}>등록</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
