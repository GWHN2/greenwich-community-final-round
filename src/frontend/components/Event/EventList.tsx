import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import API from '../../data/api';
import {
  EditingItemIdState,
  ShowingModalState,
  UserRoleState,
} from '../../data/globalState';
import { getHeaders } from '../../utils/getHeaders';
import Button from '../common/Button';
import RefetchButton from '../common/RefetchButton';
import { Item } from '../Item';

const EventList = () => {
  const userRole = useRecoilValue(UserRoleState);
  const setShowingModal = useSetRecoilState(ShowingModalState);
  const setEditingItem = useSetRecoilState(EditingItemIdState);

  const {
    isLoading,
    data: events,
    isError,
    refetch,
  } = useQuery(['events'], async (): Promise<any> => {
    const headers = getHeaders();
    const response = await API.get(`/events/`, {
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
    <div>
      <div className='flex items-center justify-center'>
        {userRole === 'Admin' && (
          <Button
            onClick={() => {
              setEditingItem(null);
              setShowingModal('ManageItem');
            }}
          >
            Add
          </Button>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
        {events &&
          events.map((course: any, index: number) => {
            return (
              <div key={index}>
                <Item {...course} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EventList;
