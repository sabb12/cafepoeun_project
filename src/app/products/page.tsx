"use client";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/MenuModal/MenuModal";
import Product from "./components/Product";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"} />
      <Product />
      <Footer />
    </div>
  );
}
