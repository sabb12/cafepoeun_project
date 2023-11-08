type keySet = { [key: string]: string };

export const LANGUAGE_SET: { [key: string]: keySet } = {
  ko: {
    success: "성공",
    delete: "삭제",
    welcome: "환영합니다",
  },
  en: {
    success: "성공",
    delete: "삭제",
    welcome: "환영합니다",
  },
};

// i18n.t("success")

let currentLocale = "ko";
const i18n = {
  t: function (key: string) {
    return LANGUAGE_SET[currentLocale][key];
  },
};

export function setLocale(locale: "ko" | "en" | "cn") {
  currentLocale = locale;
}

export default i18n;
