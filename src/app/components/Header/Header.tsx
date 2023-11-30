/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import useUserAgent from "@/app/hooks/useUserAgent";
import i18n, { Locale, setLocale } from "@/i18n/locale";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/routers";
import { PiShoppingCartBold } from "react-icons/pi";

type Props = {
  onClick?: () => void;
  showSearch: boolean;
  showCart: boolean;
};

export default function Header(props: Props) {
  const { showSearch, showCart, onClick } = props;
  const [isSubHeader, setIsSubHeader] = useState(false);

  const router = useRouter();

  useEffect(function () {
    const storedLocale = localStorage.getItem("lang");
    if (storedLocale) {
      setLocale(storedLocale as Locale);
    }
  }, []);

  // const { isMobile } = useUserAgent();
  // console.log(`${styles.wrapper} ${isMobile ? styles.mo : ""}`);

  return (
    // {isMobile && <MobileStyleCompoent /> : <PcStyleComponent/>}
    // or
    // <div className={isMobile ? styles.no : ""}
    <div className={styles.wrapper}>
      {/* <div className={styles.container}> */}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img
            src="/images/cafepoeunLogo.png"
            alt=""
            width={100}
            height={50}
            onClick={function () {
              router.push(ROUTE.home);
            }}
          />
        </div>
        <div className={styles.menuContainer}>
          {/* <div className={styles.menu}>{i18n.t("success")}</div> */}
          <div className={styles.menu}>{i18n.t("brandStory")}</div>
          <div
            className={styles.menu}
            onClick={function () {
              setIsSubHeader(!isSubHeader);
            }}
          >
            <div
              className={styles.menu}
              onClick={function () {
                router.push(ROUTE.product);
              }}
            >
              {i18n.t("menu")}
            </div>
          </div>
          <div className={styles.menu}> {i18n.t("cs")}</div>
          {showSearch && <input type="text" />}
          {showCart && (
            <div
              className={styles.menu}
              onClick={function () {
                router.push(ROUTE.cart);
              }}
            >
              <PiShoppingCartBold size={18} />
            </div>
          )}
        </div>
        <div className={styles.langLoginContainer}>
          <div
            className={styles.koreanLang}
            onClick={function () {
              setLocale("ko");
              window.location.reload();
            }}
          >
            KR
          </div>
          <div
            className={styles.englishLang}
            onClick={function () {
              setLocale("en");
              window.location.reload();
            }}
          >
            EN
          </div>
          <div
            className={styles.chineseLang}
            onClick={function () {
              setLocale("cn");
              window.location.reload();
            }}
          >
            CN
          </div>
          <button
            onClick={function () {
              router.push(ROUTE.login);
            }}
          >
            {i18n.t("login")}
          </button>
        </div>
      </div>
      {isSubHeader && (
        <div className={styles.subHeaderContainer}>
          <div className={styles.subMenu}>{i18n.t("coffee")}</div>
          <div className={styles.subMenu}>{i18n.t("decaf")}</div>
          <div className={styles.subMenu}>{i18n.t("ade")}</div>
          <div className={styles.subMenu}>{i18n.t("smoothie")}</div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
