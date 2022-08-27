import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
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

  useEffect(() => {
    (async () => {
      try {
        const nfts = await getMyNfts();
        const filteredNfts = nfts.filter((nft: any) => {
          return (
            nft[1].owner?.toString() === (sectionData?.principalId as string)
          );
        });

        setMyNfts(filteredNfts.map((nft: any) => nft[1]));
      } catch (error) {}
    })();
  }, []);

  const handleSales = async (nft: NFTData) => {};

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
                    onClick={async () => {
                      await handleSales(nft);
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyNFT;
