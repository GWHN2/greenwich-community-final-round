import Head from 'next/head';
import { useQuery } from 'react-query';
import RefetchButton from '../frontend/components/common/RefetchButton';
import { ProductList } from '../frontend/components/Marketplace';
import MyNFT from '../frontend/components/Profile/MyNFT';
import API from '../frontend/data/api';
import { APP } from '../frontend/enum';
import { getHeaders } from '../frontend/utils/getHeaders';

const Marketplace = () => {
  const {
    isLoading,
    data: products,
    isError,
    refetch,
  } = useQuery(['marketplace'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/marketplace/`, {
      headers,
    });

    return response.data?.data;
  });

  if (isLoading || isError) {
    return (
      <div className='flex'>
        <RefetchButton refetch={refetch} loading={isLoading} />
      </div>
    );
  }

  return (
    <div className='h-full '>
      <Head>
        <title>{APP.APP_NAME} | Courses and Books</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        <ProductList products={products} />
        <MyNFT isForSale />
      </main>
    </div>
  );
};

export default Marketplace;
