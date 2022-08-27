import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { SessionDataState } from "../../data/globalState";
import { transfer } from "../../service/token-service";
import Button from "../common/Button";
import HookForm from "../common/HookForm";
import Titles from "../common/Titles";

const TransferFrom = () => {
  const defaultValues = {
    PrincipalId: "",
    amount: "",
  };

  const textInputs = [
    {
      placeholder: "Enter Principal Id",
      name: "PrincipalId",
    },
    {
      placeholder: "Enter amount",
      name: "amount",
      type: "number",
    },
  ];
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const sessiondata = useRecoilValue(SessionDataState);
  const handleTransfer = async () => {
    setLoading(true);
    try {
      const response = await transfer(
        sessiondata?.principalId as string,
        formValues.PrincipalId,
        +formValues.amount
      );

      if (response?.Ok) {
        toast.success("Transfer Successful");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-6 my-10 bg-white rounded-lg lg:w-1/2 drop-shadow-xl">
      <Titles title="Transfer" className="text-center" />
      <div className="flex flex-col items-center justify-center space-y-5">
        <HookForm
          textInputs={textInputs}
          defaultValues={defaultValues}
          onTextChange={(values) => {
            setFormValues(values as any);
          }}
        />
        <div className="flex justify-center">
          <Button onClick={handleTransfer} loading={loading}>
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferFrom;
