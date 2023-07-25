import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const ImageUploader = ({ postId }) => {
  const { mutate } = useSWRConfig();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingSubmittion, setLoadingSubmittion] = useState(false);

  const [searchParams] = useSearchParams();
  const truckParams = searchParams.get('truck');
  const startParams = searchParams.get('start');
  const endParams = searchParams.get('end');

  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function handleSubmission() {
    setLoadingSubmittion(true);
    const formData = new FormData();
    formData.append('photo', selectedFile);
    axios
      .post(`/api/v1/posts/${postId}/photos`, formData)
      .then((res) => {
        if (res.statusText === 'Created') {
          mutate(`/api/v1/posts/${postId}/photos`);
          mutate(
            `/api/v1/posts?truck=${truckParams}&start=${startParams}&end=${endParams}`
          );
          setSelectedFile(null);
          toast.success(res.data.message);
          setLoadingSubmittion(false);
        } else {
          toast.error('Something went wrong');
          setLoadingSubmittion(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoadingSubmittion(false);
      });
  }

  return (
    <Box textAlign={'center'}>
      {selectedFile ? (
        <Typography variant="body2" color="text.secondary">
          {selectedFile.name}
        </Typography>
      ) : (
        <Box
          onClick={handleUploadClick}
          sx={{
            border: '1px',
            borderStyle: 'dashed',
            // height: '65%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 0.5,
            cursor: 'pointer',
            color: 'primary.main',
            mb: '22px',
            '&:hover': {
              backgroundColor: 'background.level2',
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={20}
          >
            <path
              fillRule="evenodd"
              d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
              clipRule="evenodd"
            />
            <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
          </svg>
        </Box>
      )}
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={(e) => (e.target.value = null)}
        // accept="image/png, image/jpeg"
        accept="image/*"
      />
      <div>
        {selectedFile && (
          <Stack direction="row" spacing={1}>
            <Button
              onClick={() => setSelectedFile(null)}
              size="small"
              color="inherit"
              variant="contained"
              disableElevation
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={handleSubmission}
              loading={loadingSubmittion}
              color="primary"
              size="small"
              variant="contained"
              disableElevation
            >
              Save
            </LoadingButton>
          </Stack>
        )}
      </div>
    </Box>
  );
};

export default ImageUploader;
