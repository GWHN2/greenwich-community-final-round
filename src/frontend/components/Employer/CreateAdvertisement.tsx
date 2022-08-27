import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import API from '../../data/api';
import { SessionDataState } from '../../data/globalState';
import { chargeFee } from '../../service/token-service';
import { getHeaders } from '../../utils/getHeaders';
import Button from '../common/Button';
import UploadingFilesToIPFS from '../Rating/UploadingFilesToIPFS';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const CreateAdvertisement = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const sessiondata = useRecoilValue(SessionDataState);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      const headers = getHeaders();
      await API.post(
        `/ads`,
        {
          imageUrl,
          details,
          name,
          description,
        },
        {
          headers,
        }
      );

      toast.success('Advertisement created successfully');
    } catch (error: any) {
      toast.error(
        'Error creating advertisement: ' + error?.response?.data?.msg
      );
    }

    setLoading(false);
  };

  const handleChargeFee = async () => {
    try {
      const feeResult = await chargeFee(
        sessiondata?.principalId as string,
        300
      );
    } catch (error) {
      console.log(error);
    }
  };

  const mdParser = new MarkdownIt();
  return (
    <div className='p-4 mb-20 bg-white rounded-lg shadow-xl'>
      <p className='py-4 text-2xl font-semibold text-center'>
        Make an Advertisement cost <span className='gradient-text'>300</span>{' '}
        tokens
      </p>
      <div className='mt-10'>
        <UploadingFilesToIPFS
          callback={(metaData) => {
            setImageUrl(metaData.url);
            setName(metaData.name);
            setDescription(metaData.description);
          }}
        />
        <p>Details:</p>
        <MdEditor
          className='w-full h-64 mt-2'
          renderHTML={(text) => mdParser.render(text)}
          value={details}
          onChange={(text) => setDetails(text.text)}
        />
      </div>
      <Button onClick={onSubmit} loading={loading}>
        Make advertisement
      </Button>
    </div>
  );
};

export default CreateAdvertisement;
