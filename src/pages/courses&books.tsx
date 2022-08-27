import Head from 'next/head';
import { useQuery } from 'react-query';
import RefetchButton from '../frontend/components/common/RefetchButton';
import { CourseList } from '../frontend/components/Courses';
import API from '../frontend/data/api';
import { APP } from '../frontend/enum';
import { getHeaders } from '../frontend/utils/getHeaders';

const CoursesBooks = () => {
  const {
    isLoading,
    data: courses,
    isError,
    refetch,
  } = useQuery(['courses'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/courses/`, {
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
    <div className='h-full'>
      <Head>
        <title>{APP.APP_NAME} | Courses and Books</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        <div className='flex flex-row '>
          <CourseList courses={courses} />
        </div>
      </main>
    </div>
  );
};

export default CoursesBooks;
