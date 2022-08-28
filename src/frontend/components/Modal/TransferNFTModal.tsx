import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SessionDataState,
  ShowingModalState,
  TransferringIdState,
} from "../../data/globalState";
import { transferNFT } from "../../service/nft-service";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";

const TransferNFTModal = () => {
  const [showingModal, setShowingModal] = useRecoilState(ShowingModalState);
  const sessionData = useRecoilValue(SessionDataState);
  const transferringId = useRecoilValue(TransferringIdState);
  const [loading, setLoading] = useState(false);
  const [toPrincipalId, setToPrincipalId] = useState("");

  const handleTransfer = async () => {
    if (!toPrincipalId) {
      toast.error("Please enter a valid principal id");
      return;
    }
    if (!transferringId) {
      toast.error("Please select a NFT");
      return;
    }

    setLoading(true);
    try {
      const fromPrincipalId = sessionData?.principalId as string;
      const transferResponse = await transferNFT(
        fromPrincipalId,
        toPrincipalId,
        transferringId
      );

      console.log(transferResponse);
      if (transferResponse.Ok) {
        toast.success("NFT transfer successfully");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={showingModal.includes("TransferNFT")}
      onClose={() => {
        setShowingModal("");
      }}
      className="flex flex-col items-center justify-center"
    >
      <TextInput
        label="To Principal ID"
        value={toPrincipalId}
        onChange={(e) => setToPrincipalId(e.target.value)}
      />
      <div className="">
        <Button onClick={handleTransfer} loading={loading}>
          Transfer
        </Button>
      </div>
    </Modal>
  );
};

export default TransferNFTModal;
