/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import { useParams } from "next/navigation";
import { Product } from "@/repositories/products/types";

export default function Create() {
  const params = useParams();
  const productId = Number(params.productId) || 0;
  console.log("productId :", productId);

  const [updateForm, setUpdateForm] = useState<Product>();
  console.log("updateForm :", updateForm);
  useEffect(() => {
    ProductsRepository.getById(productId).then(function (data) {
      setUpdateForm(data[0]);
    });
  }, [productId]);

  const onChangeCreatedAt = (e) => {
    const newCreateForm = { ...updateForm, createdAt: new Date() };
    setUpdateForm(newCreateForm);
  };
  const onChangeUpdatedAt = (e) => {
    const newCreateForm = { ...updateForm, updatedAt: new Date() };
    setUpdateForm(newCreateForm);
  };
  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"} />
      <div className={styles.bodyContainer}>
        <div className={styles.wrapper}>
          <div className={`${styles.nameContainer} ${styles.header}`}>
            <div className={styles.list}>상품명</div>
            <input
              className={styles.inputStyle}
              type="text"
              value={updateForm?.name}
              onChange={function (e) {
                const newUpdateForm = {
                  ...updateForm,
                  name: e.target.value,
                };
                setUpdateForm(newUpdateForm);
              }}
            />
          </div>
          <div className={`${styles.priceContainer} ${styles.header}`}>
            <div className={styles.list}>가격</div>
            <input
              className={styles.inputStyle}
              type="number"
              value={updateForm?.price}
              onChange={function (e) {
                const newUpdateForm = {
                  ...updateForm,
                  price: Number(e.target.value),
                };
                setUpdateForm(newUpdateForm);
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageList}>이미지</div>
            <img
              src={updateForm?.imageURL}
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
              onChange={function (e) {
                if (!e.target.files) return;
                const newUpdateForm = {
                  ...updateForm,
                  imageURL: URL.createObjectURL(e.target.files[0]),
                };
                setUpdateForm(newUpdateForm);
              }}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button>취소</button>
            <button
              onClick={function () {
                const newUpdateForm = {
                  ...updateForm,
                  id: Number(updateForm?.id) || 0,
                };
                ProductsRepository.update(newUpdateForm);
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
