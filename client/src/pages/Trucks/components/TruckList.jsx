import useSWR from 'swr';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import Spinner from 'components/Spinner';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TruckList({ selectTruck }) {
  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR('/api/v1/trucks', fetcher);
  //   const [isDeleting, setIsDeleting] = useState(false);

  const deleteTruck = (id) => {
    // setIsDeleting(true);
    axios
      .delete(`/api/v1/trucks/${id}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          toast.success(res.data.message);
          mutate('/api/v1/trucks');
          //   setIsDeleting(false);
        } else {
          toast.error('Something went wrong');
          //   setIsDeleting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        // setIsDeleting(false);
      });
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} mt={2} paddingX={1}>
      {error && (
        <Box display={'flex'} justifyContent="center" p={2}>
          <div>failed to load</div>
        </Box>
      )}
      {isLoading && <Spinner withText />}
      {data &&
        data.map((truck, i) => {
          return (
            <Box mb={1} key={truck.id}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                {truck.name || ''}
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => selectTruck(truck)}
                    sx={{ backgroundColor: 'background.level2' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      width="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => deleteTruck(truck.id)}
                    sx={{ backgroundColor: 'background.level2' }}
                    //   disabled={isDeleting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      width="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </IconButton>
                  {/* <button onClick={() => selectTruck(truck)}>E</button> */}
                  {/* <button onClick={() => deleteTruck(truck.id)}>X</button> */}
                </Box>
              </Box>
              {i < data.length - 1 && <Divider />}
            </Box>
          );
        })}
    </Box>
  );
}
