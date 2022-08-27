import React from "react";
import ManageCourseModal from "./Modal/ManageCourseModal";
import MintNFTModal from "./Modal/MintNFTModal";
import TransferNFTModal from "./Modal/TransferNFTModal";

const ModalContainer = () => {
  return (
    <>
      <MintNFTModal />
      <ManageCourseModal />
      <TransferNFTModal />
    </>
  );
};

export default ModalContainer;
