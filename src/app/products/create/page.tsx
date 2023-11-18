/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/routers";
import { NewProductParam } from "@/repositories/products/types";
import { uploadProductImage } from "@/app/services/file-upload";
import { omit } from "lodash";

// type ProductForm = {
//   name: string;
//   imageURL: string;
//   detail?: string;
//   price: number;
//   createdAt: Date;
//   updatedAt: Date;
// };

type CreateFormType = NewProductParam & {
  imageFile?: File;
};

const DEFAULT_PRODUCT_FROM: CreateFormType = {
  name: "",
  imageURL: "",
  detail: "",
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Create() {
  const [createForm, setCreateForm] =
    useState<CreateFormType>(DEFAULT_PRODUCT_FROM);
  const router = useRouter();
  const onChangeName = (e) => {
    const newCreateForm = { ...createForm, name: e.target.value };
    setCreateForm(newCreateForm);
  };

  const onChangePrice = (e) => {
    const newCreateForm = { ...createForm, price: Number(e.target.value) };
    setCreateForm(newCreateForm);
  };
  // 파일 서버를 가져서 서 저장한다
  // URL.createObjectURL(e.target.files[0]) - 미리보기 하기 위해 사용
  const onChangeImageURL = (e) => {
    if (!e.target.files) return;
    const newCreateForm = {
      ...createForm,
      imageURL: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0],
    };

    setCreateForm(newCreateForm);
    // 함수에 return이 없어서 undefined이 나오는 거다.
    // console.log("uploadImage:", uploadImage(newCreateForm.imageFile));
    // uploadImage(newCreateForm.imageFile);
  };

  const onChangeCreatedAt = (e) => {
    const newCreateForm = { ...createForm, createdAt: new Date() };
    setCreateForm(newCreateForm);
  };
  const onChangeUpdatedAt = (e) => {
    const newCreateForm = { ...createForm, updatedAt: new Date() };
    setCreateForm(newCreateForm);
  };

  const uploadImage = function (file: File): Promise<string> {
    const filename = `${file.name}-${Date.now()}`;
    console.log("filename:", filename);
    return uploadProductImage(filename, file).then(function ({ data, error }) {
      return data?.path || "";
    });
    // .catch(function (error) {
    //   console.log("errorrr :", error);
    // });
  };

  return (
    <div>
      <Header
        logImage={"/images/cafepoeunLogo.png"}
        showSearch={false}
        showCart={false}
      />
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
              onChange={function (e) {
                onChangePrice(e);
              }}
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
                // createForm.id = undefined;
                // uploadImage path를 꺼내서 createForm에 imageURL에 세팅해주고 create에 넘겨준다
                // uploadImage(createForm.imageFile);
                // 어떻게 upload 할까? type
                /**
                 * {
                 * name: hi
                 * price: 123123
                 * imageURL: "blob//https://"
                 * imageFile: {name, update...}
                 * }
                 *
                 */
                if (!createForm.imageFile) return;
                // const newCreateForm = {
                //   ...createForm,
                //   imageURL: "",
                // };
                // event loop, taskQ
                // 왜 이렇게 하면 안되나?
                // 왜 써버가 2갠지?
                // uploadImage(createForm.imageFile) 실행 하고
                // ProductsRepository.create(omitCreateForm) 실행 하고
                // 나중에 다 코드가 실행 하고 .then(function (data) {
                //   newCreateForm.imageURL = `https://pmpxsnzgesvvvetnflve.supabase.co/storage/v1/object/public/products/${data}`;
                // }); 이 실행 된다
                // uploadImage(createForm.imageFile).then(function (data) {
                //   newCreateForm.imageURL = `https://pmpxsnzgesvvvetnflve.supabase.co/storage/v1/object/public/products/${data}`;
                // });
                // const omitCreateForm = omit(newCreateForm, "imageFile");
                // ProductsRepository.create(omitCreateForm).then(function () {
                //   alert("상품이 등록되었습니다. 상세페이지로 이동할까요?");
                //   router.push(ROUTE.product);
                // });

                uploadImage(createForm.imageFile).then(function (data) {
                  const newCreateForm = {
                    ...createForm,
                    imageURL: `https://pmpxsnzgesvvvetnflve.supabase.co/storage/v1/object/public/products/${data}`,
                  };
                  const omitCreateForm = omit(newCreateForm, "imageFile");
                  ProductsRepository.create(omitCreateForm).then(function () {
                    alert("상품이 등록되었습니다. 상세페이지로 이동할까요?");
                    router.push(ROUTE.product);
                  });
                });
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
