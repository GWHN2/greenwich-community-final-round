import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { SessionDataState, UserRoleState } from '../../data/globalState';
import Button from '../common/Button';
import avatar from '../../../public/images/avatar.png';
import { useState, useEffect } from 'react';
import { balanceOf, chargeFee } from '../../service/token-service';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export interface ProfileProps {
  image: any;
  username: string;
  dateOfBirth: string;
  studentID: string;
  name: string;
}

const Profile = ({
  image,
  username,
  dateOfBirth,
  studentID = 'N/A',
  name
}: ProfileProps) => {
  const router = useRouter();
  const userRole = useRecoilValue(UserRoleState);
  const sessiondata = useRecoilValue(SessionDataState);

  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBalance, setLoadingBalance] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(userRole === 'Student');

  useEffect(() => {
    if (userRole !== 'Student') {
      return;
    }

    (async () => {
      setLoadingBalance(true);
      const _balance = await balanceOf(sessiondata?.principalId as string);
      console.log(_balance);
      setBalance(_balance.toString());
      setLoadingBalance(false);
    })();
  }, []);

  const handleChargeFee = async () => {
    setIsLoading(true);
    try {
      const feeResult = await chargeFee(sessiondata?.principalId as string, 10);

      if (feeResult.Ok) {
        toast.success('Fee charged successfully');
        setIsUnlocking(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className='relative bg-white rounded-lg shadow-lg'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='absolute flex justify-center w-full -top-1/3'>
            {userRole === 'Student' ||
              (isUnlocking && (
                <div className='w-40 h-40 overflow-hidden rounded-full'>
                  <Image
                    src={image || avatar}
                    alt='profile picture'
                    // layout="fill"
                    objectFit='cover'
                  />
                </div>
              ))}
          </div>
          <div className={`p-4 pt-24`}>
            <div className='text-xl font-bold text-center text-primary-400'>
              <span>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
              <Label
                text={balance?.toString()}
                label='Number of Token'
                className='font-semibold gradient-text'
                loading={isLoadingBalance}
              />
              {userRole === 'Student' ||
                (isUnlocking && (
                  <div>
                    <Label text={dateOfBirth} label='Date of Birth' />
                    <Label text={studentID} label='Student ID' />
                    {!isUnlocking && (
                      <Button
                        onClick={() => {
                          router.push('/transfer');
                        }}
                      >
                        Transfer
                      </Button>
                    )}
                  </div>
                ))}
              {userRole === 'Admin' && (
                <div>
                  <Label
                    text={balance.toString()}
                    label='Number of Token'
                    className='font-semibold gradient-text'
                  />
                  <Button onClick={() => {}}>View Profile</Button>
                </div>
              )}

              {userRole === 'Employer' && !isUnlocking && (
                <div>
                  <Button
                    onClick={async () => {
                      const result = confirm(
                        'Are you sure you want to view this student detail?'
                      );
                      if (result) {
                        await handleChargeFee();
                      }
                    }}
                  >
                    View Details (10 Token)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Label = ({
  label,
  text,
  className,
  loading,
}: {
  label?: string;
  text: string;
  className?: string;
  loading?: boolean;
}) => {
  return (
    <div className='flex flex-row p-2 rounded-lg '>
      {label && (
        <div className={`text-primary-400 font-medium`}>{label}:&nbsp;</div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <span className={`text-center text-primary-400 ${className}`}>
          {text}
        </span>
      )}
    </div>
  );
};
export default Profile;
