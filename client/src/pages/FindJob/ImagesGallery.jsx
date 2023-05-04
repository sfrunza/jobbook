import Box from '@mui/material/Box';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from './Image';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ImageUploader from './ImageUploader';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ImagesGallery({ jobId, userId }) {
  const { data, isLoading } = useSWR(
    jobId ? `/api/v1/jobs/${jobId}/images` : null,
    fetcher
  );

  return (
    <Gallery>
      <Box display="flex" gap={0.5} marginY={1}>
        {isLoading && (
          <Stack direction="row" gap={0.5}>
            <Stack gap={0.5} alignItems="center">
              <Skeleton variant="rectangular" width={40} height={40} />
              {/* <Skeleton variant="circular" width={18} height={18} /> */}
            </Stack>
            <Stack gap={0.5} alignItems="center">
              <Skeleton variant="rectangular" width={40} height={40} />
              {/* <Skeleton variant="circular" width={18} height={18} /> */}
            </Stack>
          </Stack>
        )}
        {data?.map((image, i) => {
          return (
            <Item
              key={image.id}
              original={image.image.url}
              width="960"
              height="1280"
            >
              {({ ref, open }) => (
                <Image
                  imageRef={ref}
                  open={open}
                  image={image}
                  jobId={jobId}
                  userId={userId}
                />
              )}
            </Item>
          );
        })}
        <ImageUploader jobId={jobId} userId={userId} />
      </Box>
    </Gallery>
  );
}
