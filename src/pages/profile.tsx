import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import RefetchButton from "../frontend/components/common/RefetchButton";
import { OverallGrade, Profile, Rating } from "../frontend/components/Profile";
import MyNFT from "../frontend/components/Profile/MyNFT";
import API from "../frontend/data/api";
import {
  SessionDataState,
  UserDataState,
} from "../frontend/data/globalState/index";
import { APP } from "../frontend/enum";
import { balanceOf } from "../frontend/service/token-service";
import { getHeaders } from "../frontend/utils/getHeaders";
import avatar from "../public/images/avatar.png";

function ProfilePage() {
  const userData = useRecoilValue(UserDataState);

  const {
    isLoading,
    data: profile,
    isError,
    refetch,
  } = useQuery(["profile"], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/users/${userData._id}`, {
      headers,
    });

    return response.data?.data;
  });

  if (isLoading || isError) {
    return (
      <div className="flex">
        <RefetchButton refetch={refetch} loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="h-full ">
      <Head>
        <title>{APP.APP_NAME} | View Profile</title>
      </Head>
      <main className="container flex flex-col items-center justify-center mx-auto mt-32 space-y-4">
        <div className="flex justify-center mb-10 flex-nowrap">
          <Profile {...profile} />
          <div className="ml-10 space-y-4">
            {/* <Rating {...rating} />
            <OverallGrade {...overallGrade} /> */}
          </div>
        </div>
        <MyNFT />
      </main>
    </div>
  );
}

export default ProfilePage;
