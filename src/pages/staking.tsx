import Head from "next/head";
import { useRecoilValue } from "recoil";
import PendingEventList from "../frontend/components/Staking/PendingEventList";
import Stake from "../frontend/components/Staking/Stake";
import { UserDataState } from "../frontend/data/globalState/index";
import { APP } from "../frontend/enum";

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
