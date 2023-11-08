import { useEffect, useState } from "react";
console.log("1 :", navigator.userAgent);
// server side rendering ssr
// client side rendering csr
export default function useUserAgent() {
  const [isMobile, setIsMobile] = useState(false);
  console.log("2 :", navigator.userAgent); // npm run 할 때 error날수도 있다
  useEffect(function () {
    console.log("3 :", navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobile);
  }, []);

  return {
    isMobile,
  };
}
