"use client";

import { useEffect } from "react";

export default function KakaoLoginPage() {
  useEffect(function () {
    const params = new URL(location.toString()).searchParams;
    const code = params.get("code");
    console.log("code: ", code);
    if (code) {
      localStorage.setItem("kakaoCode", code);
      location.href = "/";
      //   절대주소랑         상대주소 차이
      // '/kakao-login' and 'kakao-login'
    }
  }, []);

  return <div>로그인중입니다</div>;
}
