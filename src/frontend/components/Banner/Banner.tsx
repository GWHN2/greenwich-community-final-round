const Banner = ({ imageUrl }: any) => {
  return (
    <div className='h-full'>
      <img src={imageUrl} alt='ad' className='h-full' />
    </div>
  );
};

export default Banner;
