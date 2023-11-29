/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import { useParams, useRouter } from "next/navigation";
import {
  NewProductParam,
  Product,
  UpdateProductParam,
} from "@/repositories/products/types";

import { ROUTE } from "@/routers";

const DEFAULT_PROUDCT_FORM: UpdateProductParam = {
  name: "",
  price: 0,
  imageURL: "",
  detail: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Create() {
  const params = useParams();
  const productId = Number(params.productId) || 0;
  const router = useRouter();
  console.log("productId :", productId);

  const [updateForm, setUpdateForm] =
    useState<UpdateProductParam>(DEFAULT_PROUDCT_FORM);
  console.log("updateForm :", updateForm);

  useEffect(() => {
    ProductsRepository.getById(productId).then(function (data) {
      setUpdateForm(data[0]);
    });
  }, []);

  const onChangeCreatedAt = (e: React.FormEvent<HTMLInputElement>) => {
    const newCreateForm = { ...updateForm, createdAt: new Date() };
    setUpdateForm(newCreateForm);
  };
  const onChangeUpdatedAt = (e: React.FormEvent<HTMLInputElement>) => {
    const newCreateForm = { ...updateForm, updatedAt: new Date() };
    setUpdateForm(newCreateForm);
  };
  return (
    <div>
      <Header showSearch={false} showCart={false} />
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
            <button
              onClick={function () {
                alert("상세페이지로 이동할까요?");
                router.push(ROUTE.product);
              }}
            >
              취소
            </button>
            <button
              onClick={function () {
                const newUpdateForm = {
                  ...updateForm,
                  id: Number(productId) || 0,
                };
                ProductsRepository.update(newUpdateForm);
                alert("상품이 수정되었습니다. 상세페이지로 이동할까요?");
                router.push(ROUTE.product);
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
