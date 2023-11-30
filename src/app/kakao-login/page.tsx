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
    }
  }, []);

  return <div>로그인중입니다</div>;
}
