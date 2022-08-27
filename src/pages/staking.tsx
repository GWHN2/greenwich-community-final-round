import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import RefetchButton from "../frontend/components/common/RefetchButton";
import { OverallGrade, Profile, Rating } from "../frontend/components/Profile";
import MyNFT from "../frontend/components/Profile/MyNFT";
import PendingEventList from "../frontend/components/Staking/PendingEventList";
import Stake from "../frontend/components/Staking/Stake";
import API from "../frontend/data/api";
import {
  SessionDataState,
  UserDataState,
} from "../frontend/data/globalState/index";
import { APP } from "../frontend/enum";
import { balanceOf } from "../frontend/service/token-service";
import { getHeaders } from "../frontend/utils/getHeaders";
import avatar from "../public/images/avatar.png";

function StakingPage() {
  const userData = useRecoilValue(UserDataState);

  return (
    <div className="h-full ">
      <Head>
        <title>{APP.APP_NAME} | Stake</title>
      </Head>
      <main className="container flex flex-col items-center justify-center mx-auto mt-20 space-y-4">
        <Stake />
        <PendingEventList />
      </main>
    </div>
  );
}

export default StakingPage;
