/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import useUserAgent from "@/app/hooks/useUserAgent";
import i18n, { Locale, setLocale } from "@/i18n/locale";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/routers";
import { PiShoppingCartBold } from "react-icons/pi";

// type Props = {
//   onClick?: () => void;
//   showSearch: boolean;
//   showCart: boolean;
// };

export default function Header() {
  // const { showSearch, showCart, onClick } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  // page가 rendering 됬을 때
  // 로그인이 안 되어 있을 때
  // 로그인 버튼이 보여야 한다
  // 로그인 됬어 있을 때 로그인이 되어 있다
  // 로그인 버튼이 안보여야 한다
  useEffect(function () {
    // 로그인여부 = localStorage에서 꺼내서 판단
    const isLogin = !!localStorage.getItem("kakaoCode");
    // 로그인 안되어 있을때 => 로그인여부가 false일때
    setIsLogin(isLogin);
    // 로그인 버튼이 보인다
    // 로그인 되어 있을때 => 로그인여부가 true일때
    // 로그인 버튼이 안보인다
  }, []);

  const router = useRouter();

  useEffect(function () {
    const storedLocale = localStorage.getItem("lang");
    if (storedLocale) {
      setLocale(storedLocale as Locale);
    }
  }, []);

  const menuList = [
    { menu: i18n.t("brandStory"), path: "" },
    { menu: i18n.t("menu"), path: "" },
    { menu: i18n.t("cs"), path: ROUTE.customerservice },
    // Add more menu items as needed
  ];

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
            width={70}
            height={70}
            onClick={function () {
              router.push(ROUTE.home);
            }}
          />
          <div
            className={styles.logoTitle}
            onClick={function () {
              router.push(ROUTE.home);
            }}
          >
            {i18n.t("cafeFirstName")} <br /> {i18n.t("cafeSecondName")}
          </div>
        </div>
        <div className={styles.menuContainer}>
          {menuList.map((title, i) => {
            return (
              <div
                key={i}
                className={styles.menu}
                onClick={() => {
                  if (title.path) {
                    router.push(title.path);
                  }
                  setIsSubMenuVisible(!isSubMenuVisible);
                }}
                // onMouseEnter={() => setIsSubMenuVisible(true)}
                // onMouseLeave={() => setIsSubMenuVisible(false)}
              >
                {title.menu}
              </div>
            );
          })}

          {/* {showSearch && <input type="text" />}
          {showCart && (
            <div
              className={styles.menu}
              onClick={function () {
                router.push(ROUTE.cart);
              }}
            >
              <PiShoppingCartBold size={18} />
            </div>
          )} */}
        </div>
        <div className={styles.langLoginContainer}>
          <div className={styles.langContainer}>
            <div
              className={styles.lang}
              onClick={function () {
                setLocale("ko");
                window.location.reload();
              }}
            >
              KR
            </div>
            <div
              className={styles.lang}
              onClick={function () {
                setLocale("en");
                window.location.reload();
              }}
            >
              EN
            </div>
            <div
              className={styles.lang}
              onClick={function () {
                setLocale("cn");
                window.location.reload();
              }}
            >
              CN
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {!isLogin && (
              <button
                className={styles.loginButton}
                onClick={function () {
                  router.push(ROUTE.login);
                }}
              >
                {i18n.t("logIn")}
              </button>
            )}
          </div>
        </div>
      </div>
      {isSubMenuVisible && (
        <div className={styles.subHeaderContainer}>
          <div
            className={styles.subMenu}
            onClick={() => {
              router.push(ROUTE.product);
            }}
          >
            {i18n.t("coffee")}
          </div>
          <div className={styles.subMenu}>{i18n.t("decaf")}</div>
          <div className={styles.subMenu}>{i18n.t("ade")}</div>
          <div className={styles.subMenu}>{i18n.t("smoothie")}</div>
        </div>
      )}
    </div>
  );
}
