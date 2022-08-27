import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ListingPriceState, ShowingModalState } from "../../data/globalState";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";

const ListingNFTModal = () => {
  const [showingModal, setShowingModal] = useRecoilState(ShowingModalState);
  const [price, setPrice] = useState("");
  const setListingPrice = useSetRecoilState(ListingPriceState);

  const handleConfirm = () => {
    if (!price) {
      toast.error("Please enter a price");
      return;
    }
    setListingPrice(+price);
    setShowingModal("");
  };

  return (
    <Modal
      isOpen={showingModal.includes("ListingNFT")}
      onClose={() => {
        setShowingModal("");
      }}
      className="flex flex-col items-center justify-center"
    >
      <TextInput
        label="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="">
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default ListingNFTModal;
