import React from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { SessionDataState } from '../../data/globalState';
import { GradeData } from '../../data/type';
import { claimOrDeposit } from '../../service/token-service';
import Button from '../common/Button';
import GradesSection from './GradesSection';

const GradesList = ({ grades }: any) => {
  const sessiondata = useRecoilValue(SessionDataState);

  const handleClaim = async (id: string, tokens: number) => {
    try {
      const claimResult = await claimOrDeposit(
        sessiondata?.principalId as string,
        tokens
      );
      console.log(claimResult);
      if (claimResult.Ok) {
        toast.success('Claim Successful');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full mt-10'>
      <div className='grid w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
        {grades.map((grade: GradeData, index: number) => {
          return (
            <div
              key={index}
              className='relative flex flex-col items-center justify-center w-full p-2 mt-10 bg-white rounded-lg shadow-lg'
            >
              <div className='absolute px-2 py-1 text-lg text-white rounded-lg left-6 -top-5 bg-primary-300'>
                {grade.subjectName}
              </div>
              <div className='pt-4'>
                <GradesSection grade={grade.grade} className='text-2xl' />
                <Button
                  onClick={async () => {
                    await handleClaim(grade._id, grade.tokens);
                  }}
                >
                  {grade.subjectStatus === 'Completed'
                    ? `Claim ${grade.tokens} token`
                    : grade.subjectStatus}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradesList;
