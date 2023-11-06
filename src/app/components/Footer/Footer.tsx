import { useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.title}>
        카페
        <br />
        포은
      </div>
      <div className={styles.footerDetails}>
        <div className={styles.details}>
          COPYRIGHT(C) 2023 by CAFEPOEUN CO. LTD. ALL RIGHTS RESERVED.
          개인정보처리방침 이메일주소무단수집거부 .
        </div>
        <div className={styles.details}>
          카페포은 | 사업자등록번호 14-77-29387 | 대표이사: 임학민 | 대표전화:
          02-888-8888
        </div>
        <div className={styles.details}>주소: 서울특별시 망원동 포은로 124</div>
      </div>
    </div>
  );
}
