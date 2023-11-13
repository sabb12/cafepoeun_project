/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./Header.module.css";
import useUserAgent from "@/app/hooks/useUserAgent";
import i18n from "@/i18n/locale";
import { ROUTE } from "@/routers";

type Props = {
  onClick?: () => void;
  logImage: string;
};

export default function Header(props: Props) {
  const { logImage, onClick } = props;
  const [isSubHeader, setIsSubHeader] = useState(false);

  const { isMobile } = useUserAgent();
  console.log(`${styles.wrapper} ${isMobile ? styles.mo : ""}`);
  return (
   

    // {isMobile && <MobileStyleCompoent /> : <PcStyleComponent/>}
    // or
    // <div className={isMobile ? styles.no : ""}
    <div className={styles.wrapper}>
      {/* <div className={styles.container}> */}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <a href={ROUTE.home}>
            <img src={logImage} alt="" width={100} height={50} />
          </a>
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.menu}>{i18n.t("success")}</div>
          <div
            className={styles.menu}
            onClick={function () {
              setIsSubHeader(!isSubHeader);
            }}
          >
           <a href={ROUTE.product}>제품소개</a>
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
