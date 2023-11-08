import { useState } from "react";
import styles from "./Header.module.css";
import useUserAgent from "@/app/hooks/useUserAgent";
import i18n from "@/i18n/locale";

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
    // class="wrapper"
    // 그냥 쓰게 되면 무슨 wrapper인지 모른다
    // css 여러개 있을 경우 a.css 파일에 .wrapper{}가 있고 b.css 파일에도 .wrapper{}가 있다
    // libray.css 에서도  .wrapper도 있다
    // 실수로 import 때 중복 될 수 있다 아니면 다른걸 썼던지
    //  해결 방법은 "productWrapper", "loginWrapper" 로 다 변경 하면된다

    //a.module.css
    // npm run 시점에 고요하게 변경해준다 .wrapper__DJVKF1
    // 겹칠 일도 없다
    // className은 string이다

    // {isMobile && <MobileStyleCompoent /> : <PcStyleComponent/>}
    // or
    // <div className={isMobile ? styles.no : ""}
    <div className={styles.wrapper}>
      {/* <div className={styles.container}> */}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={logImage} alt="" width={100} height={50} />
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.menu}>{i18n.t("success")}</div>
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
