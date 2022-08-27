import Head from 'next/head';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../frontend/components/common/Button';
import RefetchButton from '../frontend/components/common/RefetchButton';
import { GradesList, OverallGrade } from '../frontend/components/Grades';
import API from '../frontend/data/api';
import { ShowingModalState, UserDataState } from '../frontend/data/globalState';
import { APP } from '../frontend/enum';
import { getHeaders } from '../frontend/utils/getHeaders';

function Grades() {
  const userData = useRecoilValue(UserDataState);
  const setShowingModal = useSetRecoilState(ShowingModalState);

  const {
    isLoading,
    data: grades,
    isError,
    refetch,
  } = useQuery(['grades'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.post(
      `/grades/all`,
      {
        studentID: userData?._id,
      },
      {
        headers,
      }
    );

    return response.data?.data;
  });

  if (isLoading || isError) {
    return (
      <div className='flex'>
        <RefetchButton refetch={refetch} loading={isLoading} />
      </div>
    );
  }

  const overallGrade = {
    grades: 8.0,
  };

  return (
    <div className='h-full'>
      <Head>
        <title>{APP.APP_NAME} | Grades</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        <OverallGrade {...overallGrade} />
        <GradesList grades={grades} />
        <Button
          onClick={() => {
            setShowingModal('MintNFT');
          }}
        >
          Mint NFT
        </Button>
        <p className='items-center justify-center'>
          Notice: You must capture your rating into image to mint
        </p>
      </main>
    </div>
  );
}

export default Grades;
