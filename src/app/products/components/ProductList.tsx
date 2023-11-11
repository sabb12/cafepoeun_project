/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./ProductList.module.css";

const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductList() {
  const [productList, setProductList] = useState(DUMMY_DATA);

  const addComma = (num: number) => {
    // const str = '1234567891056345349';
    // console.log(str.length);
    //정규식 comma 찾는 방법

    // console.log(str.substring(str.length - 3, str.length - 0));
    // console.log(str.substring(str.length - 6, str.length - 3));
    // console.log(str.substring(str.length - 9, str.length - 6));
    // console.log(str.substring(str.length - 12, str.length - 9));

    // console.log(str.substring(str.length - i + 3, str.length - j + 0));
    // console.log(str.substring(str.length - i + 3 , str.length - j + 3));
    // console.log(str.substring(str.length - i + 3, str.length - j + 3));
    // console.log(str.substring(str.length - i + 3, str.length - j + 3);

    // let numComma = "";
    // for (let i = 3, j = 0; j < str.length; i += 3, j += 3) {
    //   numComma =
    //     str.substring(str.length - i, str.length - j) +
    //     (i === 3 ? "" : ",") +
    //     numComma;
    //   console.log(numComma);
    // }

    // const arr = []
    // for(){
    //   arr.unshift(값)
    // }
    // arr.join()

    return;
  };

  const handleDelete = () => {
    alert("handleDelete");
  };
  const handleUpdate = () => {
    alert("handleUpdate");
  };
  const handleAddToCart = () => {
    alert("handleAddToCart");
  };

  return (
    <div className={styles.wrapper}>
      {productList.map((list, i) => {
        return (
          <div key={i} className={styles.container}>
            <div className={styles.image}>
              <img
                src="https://picsum.photos/500/300?random=1"
                alt=""
                style={{ width: "180px", height: "120px" }}
              />
            </div>
            <div className={styles.purchaseCount}>구매 명</div>
            <div className={styles.name}>아메리카노</div>
            <div className={styles.price}>￦10_000</div>
            <div className={styles.buttonsContainer}>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleUpdate}>수정</button>
              <button onClick={handleAddToCart}>addToCart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
