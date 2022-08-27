import Head from 'next/head';
import { CourseList } from '../../../frontend/components/Course';
import { APP } from '../../../frontend/enum';

function Courses() {
  return (
    <div className='h-full '>
      <Head>
        <title>{APP.APP_NAME} | Admin | Manage Courses</title>
      </Head>
      <main className='container flex flex-col items-center justify-center mt-32'>
        <div className='flex flex-col'>
          <CourseList />
        </div>
      </main>
    </div>
  );
}

export default Courses;
