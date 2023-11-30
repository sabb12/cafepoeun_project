type KeySet = { [key: string]: string };

export type Locale = "ko" | "en" | "cn";

export const LANGUAGE_SET: { [key: string]: KeySet } = {
  ko: {
    brandStory: "브랜드이야기",
    menu: "제품소개",
    cs: "고객지원",
    login: "로그인",
    coffee: "커피",
    decaf: "디카페인",
    ade: "에이드",
    smoothie: "스무디",
    add: "추가",
  },
  en: {
    brandStory: "Brand Story",
    menu: "Product",
    cs: "Customer Service",
    login: "Login",
    coffee: "COFFEE",
    decaf: "DECAF",
    ade: "ADE",
    smoothie: "SMOOTHIE",
    add: "add",
  },
  cn: {
    brandStory: "成功",
    menu: "產品介紹",
    cs: "幫助中心",
    login: "登录",
    coffee: "咖啡",
    decaf: "低咖啡因",
    ade: "汽水",
    smoothie: "冰沙",
    add: "添加",
  },
};
// const storedLocale = localStorage.getItem("lang");
let currentLocale = "ko";

const i18n = {
  t: function (key: string) {
    ``;
    return LANGUAGE_SET[currentLocale][key];
  },
};

export function setLocale(locale: "ko" | "en" | "cn") {
  currentLocale = locale;
  localStorage.setItem("lang", currentLocale);
}

export default i18n;
