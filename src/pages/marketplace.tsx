import Head from "next/head";
import { useEffect, useState } from "react";
import Spinner from "../frontend/components/common/Spinner";
import { ProductList } from "../frontend/components/Marketplace";
import MyNFT from "../frontend/components/Profile/MyNFT";
import { ProductData } from "../frontend/data/type";
import { APP } from "../frontend/enum";
import { getAllLists } from "../frontend/service/marketplace-service";

const Marketplace = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const nfts = await getAllLists();
      setProducts(
        nfts.map((nft: any) => ({
          ...nft[1],
          imageUrl: nft[1].url,
          seller: nft[1].seller.toString(),
          listId: nft[0],
        }))
      );
      setLoading(false);
    })();
  }, []);

  return (
    <div className="h-full ">
      <Head>
        <title>{APP.APP_NAME} | Courses and Books</title>
      </Head>
      <main className="container flex flex-col items-center justify-center mt-32">
        {loading ? <Spinner /> : <ProductList products={products} />}
        <MyNFT isForSale />
      </main>
    </div>
  );
};

export default Marketplace;
