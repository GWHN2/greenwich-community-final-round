import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { IsStakeholderState, SessionDataState } from "../../data/globalState";
import { isStake, stake } from "../../service/staking-service";
import { chargeFee } from "../../service/token-service";
import Spinner from "../common/Spinner";
import TextInput from "../common/TextInput";

const Stake = () => {
  const sectionData = useRecoilValue(SessionDataState);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [isStaking, setIsStaking] = useRecoilState(IsStakeholderState);

  const handleStake = async () => {
    if (!amount) {
      toast.error("Please enter amount");
      return;
    }
    setLoading(true);
    try {
      const stakeResponse = await stake(
        sectionData?.principalId as string,
        +amount
      );
      if (stakeResponse.Ok) {
        const Transfer = await chargeFee(
          sectionData?.principalId as string,
          +amount
        );
        if (Transfer.Ok) {
          toast.success("You are now a Stakeholder");
        }
      }
    } catch (error) {
      console.log("Stake: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const isStaked = await isStake(sectionData?.principalId as string);
        if (isStaked) {
          setIsStaking(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sectionData?.principalId]);

  return (
    <div className="p-4 space-y-4 rounded-lg shadow-xl">
      {isStaking ? (
        <div className="flex flex-col items-center justify-center text-green-400">
          <CheckBadgeIcon className="w-20 " />
          <span className="text-xl font-semibold">You are a Stakeholder</span>
        </div>
      ) : (
        <>
          <TextInput
            type="number"
            min="500"
            label="Amount to stake (from 500)"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div
            className="px-4 py-2 rounded-lg shadow-lg cursor-pointer plug-gradient"
            onClick={handleStake}
          >
            {loading ? (
              <Spinner />
            ) : (
              <h2 className="text-xl font-bold text-white">
                Become a Stakeholder
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Stake;
