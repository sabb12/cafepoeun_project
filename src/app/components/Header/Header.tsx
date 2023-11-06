import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isSubHeader, setIsSubHeader] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.container}> */}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src="/images/cafepoeunLogo.png" alt="" width={100} height={50} />
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.menu}>브랜드이야기</div>
          <div
            className={styles.menu}
            onClick={function () {
              setIsSubHeader(!isSubHeader);
            }}
          >
            제품소개
          </div>
          <div className={styles.menu}>고객지원</div>
          <input type="text" />
        </div>
        <div className={styles.langLoginContainer}>
          <div>KR | EN | CN</div>
          <button>로그인</button>
        </div>
      </div>
      {isSubHeader && (
        <div className={styles.subHeaderContainer}>
          <div className={styles.subMenu}>커피</div>
          <div className={styles.subMenu}>디카페인</div>
          <div className={styles.subMenu}>애이드</div>
          <div className={styles.subMenu}>스무디</div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
