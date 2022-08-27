import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  ListingPriceState,
  SessionDataState,
  ShowingModalState,
  TransferringIdState,
  UserDataState,
  UserRoleState,
} from "../../data/globalState";
import Button from "../common/Button";
import avatar from "../../../public/images/avatar.png";
import { useEffect, useState } from "react";
import { getMyNfts } from "../../service/nft-service";
import { NFTData } from "../../data/type";
import Titles from "../common/Titles";
import { shortenAddress } from "../../utils/stringsFunction";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { listNft } from "../../service/marketplace-service";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

export interface ProfileProps {
  image: any;
  username: string;
  dateOfBirth: string;
  StudentID: string;
  numOfToken: number;
}

const MyNFT = ({ isForSale = false }: { isForSale?: boolean }) => {
  const sectionData = useRecoilValue(SessionDataState);
  const [myNfts, setMyNfts] = useState<NFTData[]>([]);
  const setShowingModal = useSetRecoilState(ShowingModalState);
  const setTransferringId = useSetRecoilState(TransferringIdState);
  const listingPrice = useRecoilValue(ListingPriceState);
  const resetListingPrice = useResetRecoilState(ListingPriceState);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingList(true);
      try {
        const nfts = await getMyNfts();
        console.log("====================================");
        console.log(nfts);
        console.log("====================================");
        const filteredNfts = nfts.filter((nft: any) => {
          return (
            nft[1].owner?.toString() === (sectionData?.principalId as string)
          );
        });

        setMyNfts(filteredNfts.map((nft: any) => ({ ...nft[1], id: nft[0] })));
      } catch (error) {
        console.log(error);
      }
      setLoadingList(false);
    })();
  }, []);

  const handleSales = async (nft: NFTData) => {
    setLoading(true);
    try {
      const listNFTresponse = await listNft(listingPrice as number, nft);
      console.log(listNFTresponse);
      if (listNFTresponse) {
        toast.success("NFT listed successfully");
        resetListingPrice();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loadingList) {
    return <Spinner />;
  }

  return (
    <div className="pb-10">
      <Titles title="Your NFT" className="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myNfts &&
          myNfts.length > 0 &&
          myNfts.map((nft, index) => (
            <div
              className="flex flex-col items-center justify-around p-4 rounded-lg shadow-lg cursor-pointer dropdown-container"
              key={index}
            >
              <div className="w-60 h-60">
                <img
                  className="object-contain w-full h-full"
                  src={nft.url}
                  alt={nft.name}
                />
              </div>
              <span className="">Name: {nft.name}</span>
              <span className="">Description: {nft.description}</span>
              <span className="">
                Owner: {shortenAddress(nft.owner.toString())}
              </span>

              <div className="dropdown-item">
                {isForSale ? (
                  <Button
                    onClick={() => {
                      setShowingModal("ListingNFTModal");
                    }}
                  >
                    Sale
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setTransferringId(nft.id);
                      setShowingModal("TransferNFT");
                    }}
                  >
                    Transfer
                  </Button>
                )}
              </div>
              {listingPrice && (
                <div>
                  <Button
                    onClick={async () => {
                      await handleSales(nft);
                    }}
                    loading={loading}
                  >
                    List for
                    <span className="mx-1 font-semibold gradient-text">
                      {listingPrice}
                    </span>
                    token
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyNFT;
