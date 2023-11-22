/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./page.module.css";
import * as CartRepository from "@/repositories/cart/CartRepository";
import { Cart } from "@/repositories/cart/types";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartList, setCartList] = useState<Cart[]>([]);
  console.log(cartList);

  useEffect(function () {
    CartRepository.getList().then(function (data) {
      setCartList(data);
    });
  }, []);
  // TODO. count랑 같이 계산 하기 cart.products.count +
  const totalPrice = cartList.reduce((acc, cur) => acc + cur.products.price, 0);

  return (
    <div>
      <Header
        logImage={"/images/cafepoeunLogo.png"}
        showSearch={false}
        showCart={true}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>장바구니</div>
          <div className={`${styles.subTitleContainer} ${styles.subContainer}`}>
            <div className={styles.subTitle}>
              <input type="checkbox" />
              전체선택
            </div>
            <button>선택삭제</button>
          </div>
          <hr className={styles.hr} />
          {cartList.map((cart, i) => {
            return (
              <div key={cart.id}>
                <div
                  className={`${styles.headerContainer} ${styles.subContainer}`}
                >
                  <input type="checkbox" />
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
                  className={`${styles.bodyContainer} ${styles.subContainer}`}
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
                        const newCart = { count: cart.count - 1 };
                        CartRepository.update(cart.id, newCart).then(
                          function () {
                            CartRepository.getList().then(function (data) {
                              setCartList(data);
                            });
                          }
                        );
                      }}
                    >
                      &lt;
                    </div>
                    <input type="text" value={cart.count} />
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
                    {cart.products.price * cart.count}원
                  </div>
                </div>
              </div>
            );
          })}
          <hr className={styles.hr} />
          <div className={styles.totalPriceContainer}>
            <div className={styles.totalPrice}>총 {totalPrice}금액</div>
            <button>구매하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
