/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import { useRouter } from "next/navigation";
import { PROUDCT_ID_KEY, ROUTE } from "@/routers";

// const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductList() {
  // const [productList, setProductList] = useState(DUMMY_DATA);
  const [productList, setProductList] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    ProductsRepository.getList().then(function (data) {
      setProductList(data);
    });
  }, []);
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
    // for (let i = 3, j = 0; j < num.length; i += 3, j += 3) {
    //   numComma =
    //   num.substring(num.length - i, num.length - j) +
    //     (i === 3 ? "" : ",") +
    //     numComma;
    //   console.log("num :", num)
    // }

    // const arr = []
    // for(){
    //   arr.unshift(값)
    // }
    // arr.join()

    // return Number(numComma);
    // const numStr = num.toString();
    const numComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numComma;
  };

  // const handleDelete = () => {
  //   alert("handleDelete");
  //   ProductsRepository.deleteById(productList.????)
  // };
  // const handleUpdate = () => {
  //   window.location.href = `/products/${product.id}`;
  // };
  // const handleAddToCart = () => {
  //   alert("handleAddToCart");
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.addButtonContainer}>
        <button
          onClick={function () {
            router.push(ROUTE.create);
          }}
        >
          추가
        </button>
      </div>
      {productList.map((product, i) => {
        return (
          <div key={product.id} className={styles.container}>
            <div className={styles.image}>
              <img
                src={product.imageURL}
                alt=""
                style={{ width: "180px", height: "120px" }}
              />
            </div>
            <div className={styles.purchaseCount}>구매 10명</div>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.price}>{addComma(product.price)}</div>
            <div className={styles.buttonsContainer}>
              <button
                onClick={function () {
                  ProductsRepository.deleteById(product.id).then(function () {
                    ProductsRepository.getList().then(function (data) {
                      setProductList(data);
                    });
                  });
                  alert("삭제 하시겠습니까?");
                }}
              >
                삭제
              </button>
              <button
                onClick={function () {
                  alert("수정 하시겠습니까?");

                  router.push(
                    ROUTE.productDetail.replace(
                      PROUDCT_ID_KEY,
                      String(product.id)
                    )
                  );

                  // router.push({
                  //   pathname: "/products/[productId]",
                  //   query: { productId: product.id },
                  // });

                  // handleUpdate(product.id)
                }}
              >
                수정
              </button>
              <button>addToCart</button>
            </div>
          </div>
        );
      })}
      <div className={styles.paginationContainer}>
        <button>Prev</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>Next</button>
      </div>
    </div>
  );
}

/**
 *
 * 1. 한페이지에 6개 식 나오기
 * 2. 버튼개수 => productList.length / 6
 * 3. 버튼 클릭 했을 때
 *    - 1 클릭: 0 ~ 5 index
 *    - 2 클릭: 6 ~ 11 index
 *    - 3 클릭: 12 ~ 17 index
 *    - 4 클릭: 18 ~ 23 index
 *
 * 4. 규칙                      1        6    0
 *    - 1 클릭: 0 ~ 5 index => (1 - 1) * 6 => 0   / 6 - 1 => 5  ? 0 + 5 = 5
 *    - 2 클릭: 6 ~ 11 index => (2 - 1) * 6 => 6  / 6 - 2 => 4  ? 6 + 5 = 11
 *    - 3 클릭: 12 ~ 17 index => (3 - 1) * 6 => 12 / 6 - 3 = 3  ? 12 + 5 = 17
 *    - 4 클릭: 18 ~ 23 index => (4 - 1) * 6 => 18 / 6 - 4 = 2  ? 17 + 5 = 22
 *
 *      시작인덱스 = (내번호 - 1) * 페이지크기
 *      끝인덱스 = (시작인덱스 + 5)
 *
 */

// 버튼.map()=> {
//   <button onClick={function(){

//     slice(시작인덱스, 끝인덱스)
//     setProductList()
//   }}>{num}</button>
// }
