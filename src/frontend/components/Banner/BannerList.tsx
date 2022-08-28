import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import API from '../../data/api';
import { AdData } from '../../data/type/index';
import { getHeaders } from '../../utils/getHeaders';
import RefetchButton from '../common/RefetchButton';
import Banner from './Banner';

import 'swiper/css/bundle';

import { Autoplay, Navigation, Pagination } from 'swiper';

const BannerList = () => {
  const {
    isLoading,
    data: ads,
    isError,
    refetch,
  } = useQuery(['ads'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/ads`, {
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
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      className='h-screen'
    >
      {ads.map((ad: AdData, i: number) => (
        <SwiperSlide key={i}>
          <Banner imageUrl={ad.imageUrl} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerList;
