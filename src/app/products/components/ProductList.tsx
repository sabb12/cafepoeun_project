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
    </div>
  );
}
