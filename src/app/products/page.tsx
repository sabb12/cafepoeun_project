"use client";

import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Product from "./components/ProductList";
import styles from "./page.module.css";
import { divide } from "lodash";

export default function HomePage() {
  return (
    <div className={styles.productListPageWrapper}>
      <Header />
      <div className={styles.productList}>
        <Product />
      </div>
      <Footer />
    </div>
  );
}
