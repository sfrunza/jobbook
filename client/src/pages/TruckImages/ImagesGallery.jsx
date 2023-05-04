import Box from '@mui/material/Box';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from './Image';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ImageUploader from './ImageUploader';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ImagesGallery({ postId }) {
  const { data, isLoading } = useSWR(
    postId ? `/api/v1/posts/${postId}/photos` : null,
    fetcher
  );

  return (
    <Gallery>
      <Box display="flex" gap={0.5} marginY={1}>
        {isLoading && (
          <Stack direction="row" gap={0.5}>
            <Stack gap={0.5} alignItems="center">
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="circular" width={18} height={18} />
            </Stack>
          </Stack>
        )}
        {data?.map((photo, i) => {
          return (
            <Item key={photo.id} original={photo.photo.url} cropped>
              {({ ref, open }) => (
                <Image
                  imageRef={ref}
                  open={open}
                  image={photo}
                  postId={postId}
                />
              )}
            </Item>
          );
        })}
        <ImageUploader postId={postId} />
      </Box>
    </Gallery>
  );
}
