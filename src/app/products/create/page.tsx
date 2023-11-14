/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import { useRouter } from 'next/navigation';
import { ROUTE } from "@/routers";

type ProductForm = {
  id: number;
  name: string;
  imageURL: string;
  detail?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

const DEFAULT_PRODUCT_FROM: ProductForm = {
  id: Date.now(),
  name: "",
  imageURL: "",
  detail: "",
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Create() {
  const [createForm, setCreateForm] =
    useState<ProductForm>(DEFAULT_PRODUCT_FROM);
    const router = useRouter()
  const onChangeName = (e) => {
    const newCreateForm = { ...createForm, name: e.target.value };
    setCreateForm(newCreateForm);
  };

  const onChangePrice = (e) => {
    const newCreateForm = { ...createForm, price: Number(e.target.value) };
    setCreateForm(newCreateForm);
  };

  const onChangeImageURL = (e) => {
    if (!e.target.files) return;
    const newCreateForm = {
      ...createForm,
      imageURL: URL.createObjectURL(e.target.files[0]),
    };
    setCreateForm(newCreateForm);
  };

  const onChangeCreatedAt = (e) => {
    const newCreateForm = { ...createForm, createdAt: new Date() };
    setCreateForm(newCreateForm);
  };
  const onChangeUpdatedAt = (e) => {
    const newCreateForm = { ...createForm, updatedAt: new Date() };
    setCreateForm(newCreateForm);
  };

  

  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"} showSearch={false} showCart={false}/>
      <div className={styles.bodyContainer}>
        <div className={styles.wrapper}>
          <div className={`${styles.nameContainer} ${styles.header}`}>
            <div className={styles.list}>상품명</div>
            <input
              className={styles.inputStyle}
              type="text"
              value={createForm.name}
              onChange={onChangeName}
            />
          </div>
          <div className={`${styles.priceContainer} ${styles.header}`}>
            <div className={styles.list}>가격</div>
            <input
              className={styles.inputStyle}
              type="number"
              value={createForm.price}
              onChange={onChangePrice}
            />
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageList}>이미지</div>
            <img
              src={createForm.imageURL}
              alt=""
              style={{
                width: 100,
                height: 100,
                border: "1px solid red",
              }}
            />
            <input
              className={styles.fileInputStyle}
              type="file"
              onChange={onChangeImageURL}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button onClick={function(){
               alert("취소 하게되면 모든 내용이 삭제 되고, product 페이지로 넘어가도 괜찮습니까?")
              router.push(ROUTE.product)
            }}>취소</button>
            <button
              onClick={function () {
                ProductsRepository.create(createForm);
                alert("추가 하시겠습니까?")
                router.push(ROUTE.product)
              }}
            >
              저장
            </button>
          </div>
          <div
            className={styles.dateContainer}
            style={{ visibility: "hidden" }}
          >
            <div className={styles.createdAt} onChange={onChangeCreatedAt}>
              생성일
            </div>
            <div className={styles.updatedAt} onChange={onChangeUpdatedAt}>
              수정일
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
