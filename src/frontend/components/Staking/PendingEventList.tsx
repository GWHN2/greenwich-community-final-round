import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  ListingPriceState,
  SessionDataState,
  ShowingModalState,
  TransferringIdState,
} from "../../data/globalState";
import { NFTData } from "../../data/type";
import { listNft } from "../../service/marketplace-service";
import { getMyNfts } from "../../service/nft-service";
import { shortenAddress } from "../../utils/stringsFunction";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Titles from "../common/Titles";

export interface ProfileProps {
  image: any;
  username: string;
  dateOfBirth: string;
  StudentID: string;
  numOfToken: number;
}

const PendingEventList = ({ isForSale = false }: { isForSale?: boolean }) => {
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
      <Titles title="Pending Event List" className="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myNfts &&
          myNfts.length > 0 &&
          myNfts.map((nft, index) => (
            <div
              className="flex flex-col items-center justify-around p-4 rounded-lg shadow-lg cursor-pointer dropdown-container"
              key={index}
            >
              <span className="">Name: {nft.name}</span>
              <span className="">Description: {nft.description}</span>
              <span className="">
                Owner: {shortenAddress(nft.owner.toString())}
              </span>

              <div className="">
                <Button
                  onClick={() => {
                    setTransferringId(nft.id);
                    setShowingModal("TransferNFT");
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PendingEventList;
