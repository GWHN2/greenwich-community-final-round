import Head from "next/head";
import React from "react";
import { useRecoilValue } from "recoil";
import { UserRoleState } from "../data/globalState/index";
import BackToTop from "./BackToTop";
import BannerList from "./Banner/BannerList";
import Header from "./Header";
import SideBar from "./SideBar";
type LayoutPageProps = {
  children?: React.ReactNode;
};
const Layout = ({ children }: LayoutPageProps) => {
  const userRole = useRecoilValue(UserRoleState);

  return (
    <div className="flex flex-row min-h-screen min-w-screen">
      <div className="flex flex-col w-full sm:w-1/6 md:w-1/6">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SideBar />
      </div>
      <main className="flex flex-col w-full sm:w-4/6 md:w-5/6">
        <Header />
        {children}
        <BackToTop />
      </main>
      {/* {userRole === 'Student' && (
        <div className='w-1/6 h-screen sm:w-1/6 md:w-1/6'>
          <BannerList />
        </div>
      )} */}
    </div>
  );
};

export default Layout;
