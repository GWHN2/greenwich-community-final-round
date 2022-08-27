import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ListingStatusNFTState,
  SessionDataState,
} from "../../data/globalState";
import { buyNFT } from "../../service/marketplace-service";
import { transferNFT } from "../../service/nft-service";
import { transfer } from "../../service/token-service";
import { shortenAddress } from "../../utils/stringsFunction";
import Button from "../common/Button";

interface ProductProps {
  tokenId: number;
  name: string;
  imageUrl: any;
  price: number;
  url: string;
  status: string;
  seller: string;
  description: string;
  listId: number;
}

const Product = (props: ProductProps) => {
  const { tokenId, name, url, price, description, status, seller, listId } =
    props;
  const [loading, setLoading] = useState(false);
  const sessionData = useRecoilValue(SessionDataState);
  const [listingStatusNFT, setListingStatusNFT] = useRecoilState(
    ListingStatusNFTState
  );

  const handleBuy = async () => {
    const isConfirm = confirm("Are you sure you want to buy this product?");
    if (isConfirm) {
      setLoading(true);
      try {
        const transferResponse = await transfer(
          sessionData?.principalId as string,
          seller,
          price
        );

        if (transferResponse?.Ok) {
          const transferResponse = await transferNFT(
            seller,
            sessionData?.principalId as string,
            tokenId
          );

          console.log(transferResponse);
          if (transferResponse?.Ok) {
            setListingStatusNFT([...listingStatusNFT, tokenId.toString()]);
            toast.success("You have successfully bought this product");
          }
        } else {
          toast.error("Transfer Failed");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 transition duration-300 bg-white rounded-lg shadow-xl cursor-pointer hover:scale-105">
      <div className="w-60 h-60">
        <img className="object-contain w-full h-full" src={url} alt={name} />
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-2xl font-bold">{name}</h3>
        <span>{description}</span>
      </div>
      <span className="flex flex-row items-center justify-center space-x-1 text-lg">
        <span>Price:</span>
        <span className="font-semibold gradient-text">{price.toString()}</span>
        <span>Tokens</span>
      </span>
      <span
        className={`p-1 font-semibold border-2 rounded 
      ${
        listingStatusNFT.includes(tokenId.toString())
          ? " text-red-400 border-red-400"
          : "text-green-400 border-green-400"
      }`}
      >
        {listingStatusNFT.includes(tokenId.toString()) ? "Sold" : "In stock"}
      </span>
      <span>{shortenAddress(seller)}</span>
      <Button className="px-8" onClick={handleBuy} loading={loading}>
        Buy
      </Button>
    </div>
  );
};

export default Product;
