import ManageItemModal from './Modal/ManageItemModal';
import MintNFTModal from './Modal/MintNFTModal';
import TransferNFTModal from './Modal/TransferNFTModal';

const ModalContainer = () => {
  return (
    <>
      <MintNFTModal />
      <ManageItemModal />
      <TransferNFTModal />
    </>
  );
};

export default ModalContainer;
