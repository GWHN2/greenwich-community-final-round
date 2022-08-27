import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { SessionDataState } from "../../data/globalState";
import { balanceOf, claimOrDeposit } from "../../service/token-service";
import Button from "../common/Button";
import HookForm from "../common/HookForm";
import Spinner from "../common/Spinner";
import Titles from "../common/Titles";
import PaypalButton from "../PaypalButton";

const Deposit = () => {
  const textInputs = [
    {
      name: "amount",
      type: "number",
      placeholder: "Enter amount",
    },
  ];
  const defaultValues = {
    amount: "",
  };
  const sessiondata = useRecoilValue(SessionDataState);

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const handleDeposit = async () => {
    if (!formValues.amount) {
      toast.error("Please enter amount");
      return;
    }
    setLoading(true);
    try {
      const token = +formValues.amount * 100;
      const depositResult = await await claimOrDeposit(
        sessiondata?.principalId as string,
        token
      );
      console.log(depositResult);
      if (depositResult.Ok) {
        toast.success("Deposit Successful");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [balance, setBalance] = useState("0");

  useEffect(() => {
    (async () => {
      setLoadingBalance(true);
      const _balance = await balanceOf(sessiondata?.principalId as string);
      setBalance(_balance.toString());
      setLoadingBalance(false);
    })();
  }, []);

  return (
    <div className="w-full max-w-xs p-4 space-y-4 bg-white rounded-lg drop-shadow-xl">
      <Titles title="Deposit" className="text-center" />
      <span className="flex flex-row items-center justify-center space-x-2">
        <span>Your current amount:</span>
        {loadingBalance ? (
          <Spinner />
        ) : (
          <span className="text-xl font-semibold gradient-text">{balance}</span>
        )}
      </span>

      <HookForm
        textInputs={textInputs}
        defaultValues={defaultValues}
        onTextChange={(values) => {
          setFormValues(values as any);
        }}
      />

      <div className="flex items-center justify-center">
        <Button onClick={handleDeposit} loading={loading}>
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default Deposit;
