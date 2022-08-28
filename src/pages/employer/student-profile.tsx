import Head from 'next/head';
import avatar from '../../public/images/avatar.png';
import SearchInput from '../../frontend/components/common/SearchInput';
import { Profile } from '../../frontend/components/Profile';
import { APP } from '../../frontend/enum';
import { ProfileProps } from '../../frontend/components/Profile/Profile';
import { useQuery } from 'react-query';
import { getHeaders } from '../../frontend/utils/getHeaders';
import API from '../../frontend/data/api';
import RefetchButton from '../../frontend/components/common/RefetchButton';

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
        <title>{APP.APP_NAME} | Employer | View Student profile</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        {/* <SearchInput
          layoutClassName="mb-60 w-72"
          placeholder="Search by student code"
        /> */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {profiles.map((profile: ProfileProps, i: number) => {
            return (
              <div key={i} className='mb-24'>
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
