/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Suspense, use, useEffect, useState } from "react";
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
import Loader from "@/app/components/Loader/Loader";
// const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function fetchProductList() {
  return ProductsRepository.getList();
}

export default function ProductList() {
  // const [productList, setProductList] = useState(DUMMY_DATA);
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartList, setCartList] = useState<Cart[]>([]);
  // const productList: Product[] = use(fetchProductList());

  const [searProductList, setSearchProductList] = useState("");
  const [isShadowed, setIsShadowed] = useState(false);
  const [current, setCurrent] = useState(1);

  const router = useRouter();

  // component는 비동기가 안된다 만들수 없다
  // fetch() 비동기
  // fetch().then(fucntion(){})

  // 그래서 hook: useeffect, useState를 상요 하는거다

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

  // const newProductList = useMemo(() => {
  //   const newProdudct = productList.filter();
  //   return newProductList;
  // }, [productList]);

  console.log("rendering");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.addButtonContainer}>
            <button
              className={styles.addButton}
              onClick={function () {
                router.push(ROUTE.create);
              }}
            >
              {i18n.t("add")}
            </button>
          </div>
          <div className={styles.searchbarContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="카페포은 검색"
              value={searProductList}
              onChange={function (e) {
                setSearchProductList(e.target.value);
              }}
            />
            <button className={styles.searchButton}>
              <div
                className={styles.search_icon}
                onClick={function () {
                  setSearchProductList(searProductList);
                  // const searchProductByName = productList.filter((itemList) =>
                  //   itemList.name.includes(searProductList)
                  // );
                  // setProductList(searchProductByName);
                }}
              >
                <div className={styles.search_line}></div>
              </div>
            </button>
          </div>
          <div
            className={`${styles.busketIconContainer} ${
              isShadowed ? styles.boxShadow : ""
            }`}
            onClick={function () {
              setIsShadowed(!isShadowed);
              router.push(ROUTE.cart);
            }}
          >
            <div className={styles.trapezoidContainer}>
              <div className={styles.halfCircle}></div>
              <div className={styles.trapezoid}></div>
              <div className={styles.white_trapezoid}></div>
              {cartList.length === 0 ? (
                ""
              ) : (
                <div className={styles.cartCount}>{cartList.length}</div>
              )}
            </div>
            <div className={styles.bustketTextContainer}>
              <div className={styles.bustketText}>장바구니</div>
            </div>
          </div>
        </div>
        {/* <Suspense fallback={<Loader />}> */}
        <div className={styles.bodyContainer}>
          {newProductList
            .filter((productNames) =>
              productNames.name.toLocaleLowerCase().includes(searProductList)
            )
            .map((product, i) => {
              return (
                <div key={product.id} className={styles.prodcutListcontainer}>
                  <div className={styles.image}>
                    <img
                      className={styles.productListImage}
                      src={product.imageURL}
                      alt=""
                      style={{ width: "180px", height: "120px" }}
                    />
                  </div>
                  <div className={styles.infoContainer}>
                    <div className={styles.purchaseCount}>
                      {i18n.t("numberOfPurchases")} 10{i18n.t("sale")}
                    </div>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.price}>
                      {addComma(product.price)}
                    </div>
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={`${styles.productButton}`}
                      onClick={function () {
                        // filter().foreach => cartrepository.

                        // return;
                        // cartList 비여 있을 경우
                        // 비어 있으면 productList에 상품만 삭제
                        // cartlist 같은 상품 있을 경우 && 없는 경우
                        // 있으면 productList 및 cartList 상품 같이 삭제

                        // case 1: 장바구니에 상품이 2번이 담겨 있다
                        // const 상품아이디가같은장바구니아이템 = cartList.find(cart => 상품아이디가같은지);
                        /* if(!상품아이디가같은장바구니아이템){
                              상품삭제
                               return;
                           }

                           장바구니DB.삭제().then(상품삭제)
                        */
                        CartRepository.getList().then(function (cartList) {
                          const cartItemTarget = cartList.find(
                            (cart) => product.id === cart.productID
                          );
                          console.log("cartItemTarget.id: ", cartItemTarget);
                          console.log("product.id: ", product.id);
                          console.log("cartList: ", cartList);
                          // return;
                          if (!cartItemTarget) {
                            ProductsRepository.deleteById(product.id).then(
                              function () {
                                ProductsRepository.getList().then(function (
                                  data
                                ) {
                                  setProductList(data);
                                });
                              }
                            );
                            return;
                          }
                          // 장바구니DB.삭제().then(상품삭제)
                          CartRepository.deleteById(cartItemTarget.id).then(
                            function () {
                              ProductsRepository.deleteById(product.id).then(
                                function () {
                                  ProductsRepository.getList().then(function (
                                    data
                                  ) {
                                    console.log("productdata :", data);
                                    setProductList(data);
                                  });
                                }
                              );
                            }
                          );
                        });
                      }}
                    >
                      {i18n.t("delete")}
                    </button>
                    <button
                      className={`${styles.productButton}`}
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
                      {i18n.t("update")}
                    </button>
                    <button
                      className={`${styles.productButton}`}
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
                        CartRepository.getList({
                          productID: product.id,
                        }).then(function (data) {
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
                        });
                      }}
                    >
                      {i18n.t("addToCart")}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {/* </Suspense> */}
        <div className={styles.paginationContainer}>
          <button
            className={styles.prevButton}
            onClick={function () {
              setCurrent(function (prevPage) {
                return Math.max(prevPage - 1, 1);
              });
            }}
          >
            {"< 이전"}
          </button>
          <div className={styles.verticalLine}></div>
          {buttonList.slice(buttonStart, buttonEnd).map((btn, i) => {
            return (
              <button
                className={styles.pageButton}
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
          <div className={styles.verticalLine}></div>
          <button
            className={styles.nextButton}
            onClick={function () {
              setCurrent(function (prevPage) {
                return Math.min(prevPage + 1, productListPerPage);
              });
            }}
          >
            {"다음 >"}
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
