/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./page.module.css";
import * as CartRepository from "@/repositories/cart/CartRepository";
import { Cart } from "@/repositories/cart/types";
import { use, useEffect, useState } from "react";
import { PiNavigationArrowDuotone } from "react-icons/pi";

function fetchCartList() {
  return CartRepository.getList();
}

export default function Cart() {
  const [cartList, setCartList] = useState<Cart[]>([]);
  // const productList: Cart[] = use(fetchCartList());
  // useEffect(function () {
  //   CartRepository.getList().then(function (data) {
  //     setCartList(data);
  //   });
  // }, []);
  // TODO. count랑 같이 계산 하기 cart.products.count +
  const checkedTotalPrice = cartList.reduce((acc, cur) => {
    if (cur.checked) {
      return acc + cur.products.price * cur.count;
    }
    return acc;
  }, 0);
  const totalPrice = cartList.reduce(
    (acc, cur) => acc + cur.products.price * cur.count,
    0
  );

  const addComma = (num: number) => {
    const numComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numComma;
  };

  const isCheck =
    cartList.length === 0 ? false : cartList.every((cart) => cart.checked);

  return (
    <div className={styles.mainPageWrapper}>
      <Header />
      <div className={styles.bodyContainer}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.title}>장바구니</div>
            <div
              className={`${styles.subTitleContainer} ${styles.subContainer}`}
            >
              <div className={styles.subTitle}>
                <input
                  type="checkbox"
                  name={"selectAll"}
                  checked={isCheck}
                  onChange={function (e) {
                    if (e.target.name === "selectAll") {
                      const newCart = { checked: e.target.checked };
                      cartList.map((cart, i) => {
                        return CartRepository.update(cart.id, newCart).then(
                          function () {
                            CartRepository.getList().then(function (data) {
                              setCartList(data);
                            });
                          }
                        );
                      });
                    } else {
                      const newCart = { checked: false };
                      cartList.map((cart, i) => {
                        return CartRepository.update(cart.id, newCart).then(
                          function () {
                            CartRepository.getList().then(function (data) {
                              setCartList(data);
                            });
                          }
                        );
                      });
                    }
                  }}
                />
                전체선택
              </div>
              <button
                className={styles.deleteAll}
                onClick={function () {
                  cartList.filter((cart, i) => {
                    if (cart.checked) {
                      return CartRepository.deleteById(cart.id).then(
                        function () {
                          CartRepository.getList().then(function (data) {
                            setCartList(data);
                          });
                        }
                      );
                    }
                  });
                }}
              >
                선택삭제
              </button>
            </div>
            <hr className={styles.hr} />
            {cartList.map((cart, i) => {
              return (
                <div key={cart.id}>
                  <div
                    className={`${styles.headerContainer} ${styles.subContainer}`}
                  >
                    <input
                      type="checkbox"
                      checked={cart.checked}
                      onChange={function (e) {
                        if (e.target.checked) {
                          const newCart = { checked: true };
                          CartRepository.update(cart.id, newCart).then(
                            function () {
                              CartRepository.getList().then(function (data) {
                                console.log("data :", data);
                                setCartList(data);
                              });
                            }
                          );
                        } else {
                          const newCart = { checked: false };
                          CartRepository.update(cart.id, newCart).then(
                            function () {
                              CartRepository.getList().then(function (data) {
                                setCartList(data);
                              });
                            }
                          );
                        }
                      }}
                    />
                    <div
                      className={styles.deleteX}
                      onClick={function () {
                        CartRepository.deleteById(cart.id).then(function () {
                          CartRepository.getList().then(function (data) {
                            setCartList(data);
                          });
                        });
                      }}
                    >
                      &times;
                    </div>
                  </div>
                  <div
                    className={`${styles.subBodyContainer} ${styles.subContainer}`}
                  >
                    <img
                      className={styles.image}
                      src={cart.products.imageURL}
                      alt=""
                    />
                    <div className={styles.name}>{cart.products.name}</div>
                    <div className={styles.countContainer}>
                      <div
                        className={styles.minusButton}
                        onClick={function () {
                          // 0 되면 막는다
                          if (cart.count > 1) {
                            const newCart = { count: cart.count - 1 };
                            CartRepository.update(cart.id, newCart).then(
                              function () {
                                CartRepository.getList().then(function (data) {
                                  setCartList(data);
                                });
                              }
                            );
                          }
                        }}
                      >
                        &lt;
                      </div>
                      <input
                        type="text"
                        value={cart.count}
                        onChange={function (e) {
                          const countValue = Number(e.target.value);
                          if (countValue >= 1) {
                            const newCart = { count: countValue };
                            console.log("newCart: ", newCart);
                            CartRepository.update(cart.id, newCart).then(
                              function () {
                                CartRepository.getList().then(function (data) {
                                  setCartList(data);
                                });
                              }
                            );
                          }
                        }}
                      />
                      <div
                        className={styles.plusButton}
                        onClick={function () {
                          const newCart = { count: cart.count + 1 };
                          CartRepository.update(cart.id, newCart).then(
                            function () {
                              CartRepository.getList().then(function (data) {
                                setCartList(data);
                              });
                            }
                          );
                        }}
                      >
                        &gt;
                      </div>
                    </div>
                    <div className={styles.price}>
                      {addComma(cart.products.price * cart.count)}원
                    </div>
                  </div>
                </div>
              );
            })}
            <hr className={styles.hr} />
            <div className={styles.totalPriceContainer}>
              <div className={styles.totalPrice}>
                총{" "}
                {cartList.some((cart) => cart.checked)
                  ? addComma(checkedTotalPrice)
                  : addComma(totalPrice)}
                금액
              </div>
              <button className={styles.purchaseButton}>구매하기</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
