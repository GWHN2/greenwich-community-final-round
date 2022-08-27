import Head from 'next/head';
import { useQuery } from 'react-query';
import RefetchButton from '../../frontend/components/common/RefetchButton';
import SearchInput from '../../frontend/components/common/SearchInput';
import { Profile } from '../../frontend/components/Profile';
import API from '../../frontend/data/api';
import { APP } from '../../frontend/enum';
import { getHeaders } from '../../frontend/utils/getHeaders';

function StudentProfile() {
  const {
    isLoading,
    data: profiles,
    isError,
    refetch,
  } = useQuery(['profiles'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/users`, {
      headers,
    });

    return response.data?.data?.filter((profile: any) =>
      profile.roles.some((role: any) => role.code === 'STUDENT')
    );
  });

  if (isLoading || isError) {
    return (
      <div className='flex'>
        <RefetchButton refetch={refetch} loading={isLoading} />
      </div>
    );
  }

  return (
    <div className='h-full'>
      <Head>
        <title>{APP.APP_NAME} | Admin | View Student profile</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        <SearchInput
          layoutClassName='mb-60 w-72'
          placeholder='Search by student code'
        />

        <div className='flex flex-row space-x-4'>
          {profiles.map((profile: any, i: number) => {
            return (
              <div key={i}>
                <Profile {...profile} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default StudentProfile;
