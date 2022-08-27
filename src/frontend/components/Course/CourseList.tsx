import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EditingItemIdState, UserRoleState } from '../../data/globalState';
import { ShowingModalState } from '../../data/globalState/index';
import Button from '../common/Button';
import { Item } from '../Item';

const CourseList = ({ courses }: any) => {
  const userRole = useRecoilValue(UserRoleState);
  const setShowingModal = useSetRecoilState(ShowingModalState);
  const setEditingItem = useSetRecoilState(EditingItemIdState);

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
        {courses.map((course: any, index: number) => {
          return <div key={index}>{<Item {...course} />}</div>;
        })}
      </div>
    </div>
  );
};

export default CourseList;
