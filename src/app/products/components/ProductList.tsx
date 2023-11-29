/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import * as CartRepository from "@/repositories/cart/CartRepository";
import { useRouter } from "next/navigation";
import { PROUDCT_ID_KEY, ROUTE } from "@/routers";
import {
  Cart,
  CartResponse,
  NewCartParam,
  addtoCartParam,
} from "@/repositories/cart/types";
import i18n from "@/i18n/locale";
// const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductList() {
  // const [productList, setProductList] = useState(DUMMY_DATA);
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [current, setCurrent] = useState(1);
  const [isLanguageChanged, setIsLanguageChanged] = useState<
    "ko" | "en" | "cn"
  >("ko");
  const router = useRouter();

  useEffect(() => {
    ProductsRepository.getList().then(function (data) {
      setProductList(data);
    });
  }, []);

  useEffect(() => {
    CartRepository.getList().then(function (data) {
      console.log("data: ", data);
      setCartList(data);
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

  const pageSize = 5;
  const buttonSize = 5;

  const productListPerPage = Math.ceil(productList.length / pageSize);

  const pageStartIndex = (current - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const newProductList = productList.slice(pageStartIndex, pageEndIndex);

  const buttonList = [];
  const buttonStart = Math.max(0, current - 1 - Math.floor(buttonSize / 2));
  const buttonEnd = Math.min(buttonStart + buttonSize, productListPerPage);

  for (let i = 0; i < productListPerPage; i++) {
    buttonList.push(i + 1);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.addButtonContainer}>
        <button
          onClick={function () {
            router.push(ROUTE.create);
          }}
        >
          {i18n.t("add")}
        </button>
      </div>
      {newProductList.map((product, i) => {
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
                  cartList.filter((cart) => {
                    if (product.id === cart.productID) {
                      CartRepository.deleteById(cart.id).then(function () {
                        CartRepository.getList().then(function (data) {
                          setCartList(data);
                        });
                        ProductsRepository.deleteById(product.id).then(
                          function () {
                            ProductsRepository.getList().then(function (data) {
                              setProductList(data);
                            });
                          }
                        );
                      });
                    }
                  });
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
              <button
                onClick={function () {
                  // /cart 는 목록
                  // /cart/id는 사세로 볼때
                  /**
                   *  클릭한 제품 카트에 저장 된다.
                   *  만약에 카트에 해당 id가 존재 하면
                   *    -alert("이미 담은 재품 입니다")
                   *  else
                   *  저장은 CartRespository를 호출해서 저장을 한다
                   *    -confirm("장바구니로 이동 하시겠습니까?")
                   *       아니요:
                   *       예: cart 페이지로 이동
                   */
                  CartRepository.getList({ productID: product.id }).then(
                    function (data) {
                      const hasProductID: boolean = data.length !== 0;
                      if (hasProductID) {
                        alert("이미 담은 재품 입니다");
                      } else {
                        const newCart = {
                          productID: product.id,
                          count: 1,
                          checked: false,
                        };
                        //  Cartrepository.create(newCart) = 비동기
                        // 위에 then  을 안 하면 끝나기전에 다음줄이 실행 된다
                        // 그래서 끝나고 실행 하고 싶다 하면 .then을 해서 진행을 한다
                        //   Cartrepository.create(newCart).
                        // javascript promise event loop task queue
                        CartRepository.create(newCart).then(function () {
                          // 읽기 쉬운 코드가 되어야 된다. 그래서 javascript언어라고 한다
                          const toCart =
                            confirm("장바구니로 이동 하시겠습니까?");
                          if (toCart) {
                            router.push(ROUTE.cart);
                          }
                        });
                      }
                    }
                  );
                }}
              >
                addToCart
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.paginationContainer}>
        <div>
          <button
            onClick={function () {
              setCurrent(function (prevPage) {
                return Math.max(prevPage - 1, 1);
              });
            }}
          >
            Prev
          </button>
          {buttonList.slice(buttonStart, buttonEnd).map((btn, i) => {
            return (
              <button
                key={i}
                onClick={function () {
                  console.log("btn :", btn);
                  setCurrent(btn);
                }}
              >
                {btn}
              </button>
            );
          })}
          <button
            onClick={function () {
              setCurrent(function (prevPage) {
                return Math.min(prevPage + 1, productListPerPage);
              });
            }}
          >
            Next
          </button>
        </div>
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
