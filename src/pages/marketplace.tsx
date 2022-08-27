import Head from "next/head";
import React from "react";
import { ProductList } from "../frontend/components/Marketplace";
import MyNFT from "../frontend/components/Profile/MyNFT";
import { APP } from "../frontend/enum";

const CoursesBooks = () => {
  return (
    <div className="h-full ">
      <Head>
        <title>{APP.APP_NAME} | Courses and Books</title>
      </Head>
      <main className="container flex flex-col items-center justify-center mt-32">
        <ProductList />
        <MyNFT isForSale />
      </main>
    </div>
  );
};

export default CoursesBooks;
