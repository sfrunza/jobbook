import { useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'store';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Image = ({ imageRef, open, image, jobId, userId }) => {
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  function deleteImage(id) {
    setLoading(true);

    axios
      .delete(`/api/v1/jobs/${jobId}/images/${id}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          toast.success(res.data.message);
          mutate(`/api/v1/jobs/${jobId}/images`);
          mutate(`/api/v1/find_job?search=${search}`);
          setLoading(false);
        } else {
          toast.error('Something went wrong');
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
      <Box
        ref={imageRef}
        onClick={open}
        component="img"
        width={40}
        height={40}
        src={image.image.url}
        key={image.id}
        sx={{ objectFit: 'cover', '&:hover': { cursor: 'pointer' } }}
      />
      {user.admin && (
        <LoadingButton
          onClick={() => deleteImage(image.id)}
          loading={loading}
          color="inherit"
          size="small"
          variant="contained"
          sx={{
            p: 0,
            fontSize: 10,
            minWidth: 54,
            width: 'fit-content',
          }}
          disableElevation
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            width={18}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </LoadingButton>
      )}
    </Box>
  );
};

export default Image;
