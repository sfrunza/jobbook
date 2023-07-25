import React, { useState } from 'react';
import { useFormik } from 'formik';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector } from 'store';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

const MAX_COUNT = 5;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TruckImagesForm() {
  const [searchParams] = useSearchParams();
  const truckParams = searchParams.get('truck');
  const startParams = searchParams.get('start');
  const endParams = searchParams.get('end');

  const { data: trucks } = useSWR('/api/v1/trucks', fetcher);

  const { user } = useSelector((state) => state.auth);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    // console.log(e.target.files);
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const removerFile = (i) => {
    const newFiles = uploadedFiles.filter((file, idx) => idx !== i);
    setUploadedFiles(newFiles);
    setFileLimit(false);
  };

  const filesRequestArray = (postId) => {
    let arr = [];
    uploadedFiles.map((file) => {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('post_id', postId);
      arr.push(axios.post(`/api/v1/posts/${postId}/photos`, formData));
    });

    return arr;
  };

  const initialValues = {
    truckId: '',
    date: moment(),
    photos: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      date: Yup.string().required('Required'),
      truckId: Yup.number().required('Required'),
      photos: Yup.array()
        .min(1, 'required at least 1 file')
        .required('Required'),
    }),
    onSubmit: (values, action) => {
      const post = {
        truck_id: values.truckId,
        date: moment(values.date).format('YYYY-MM-DD'),
        user_id: user.id,
      };

      const formData = new FormData();
      formData.append('photo', values.photos);

      axios
        .post('/api/v1/posts', post)
        .then((res) => {
          if (res.statusText === 'Created') {
            formData.append('post_id', res.data.post.id);
            axios
              .all(filesRequestArray(res.data.post.id))
              .then(
                axios.spread((...responses) => {
                  console.log(responses);
                  mutate(
                    `/api/v1/posts?truck=${truckParams}&start=${startParams}&end=${endParams}`
                  );
                  toast.success(res.data.message);
                  setUploadedFiles([]);
                  action.resetForm();
                })
              )
              .catch((errors) => {
                console.log(errors);
              });
          } else {
            toast.error('Something went wrong');
            action.setSubmitting(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.success(err.message);
          action.setSubmitting(false);
        });
    },
  });

  // console.log(formik.values);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginY={2}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DesktopDatePicker
            // type="date"
            disablePast
            value={formik.values.date}
            // format="yyyy-mm-dd"
            onChange={(date) => formik.setFieldValue('date', date)}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                readOnly: true,
                id: 'date',
              },
            }}
            // renderInput={(params) => (
            //   <TextField
            //     {...params}
            //     error={formik.touched.date && Boolean(formik.errors.date)}
            //     fullWidth
            //     size="small"
            //     inputProps={{
            //       ...params.inputProps,
            //     }}
            //     value={formik.values.date}
            //   />
            // )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            size="small"
            value={formik.values.truckId || ''}
            SelectProps={{
              native: true,
            }}
            error={formik.touched.truckId && Boolean(formik.errors.truckId)}
            onChange={(e) => {
              if (e.target.value === '') {
                return null;
              } else {
                const id = parseInt(e.target.value);
                const selectedTruck = trucks?.find((t) => t.id === id);
                formik.setFieldValue('truckId', selectedTruck.id);
              }
            }}
          >
            <option value={''} disabled>
              Select truck
            </option>
            {trucks?.map((truck) => (
              <option key={truck.id} value={truck.id}>
                {truck.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <>
            {formik.errors && formik.errors?.photos && (
              <Typography variant="caption" color="error.main">
                {formik.errors?.photos}
              </Typography>
            )}
            <Button
              startIcon={
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
              }
              variant="outlined"
              component="label"
              disableElevation
              disabled={fileLimit}
              fullWidth
            >
              Upload
              <input
                hidden
                // accept="image/png, image/jpeg"
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => {
                  handleFileEvent(e);
                  const chosenFiles = Array.prototype.slice.call(
                    e.target.files
                  );
                  formik.setFieldValue('photos', chosenFiles);
                }}
                onClick={(e) => (e.target.value = '')}
              />
            </Button>

            <Box>
              {uploadedFiles.map((file, i) => (
                <Box key={i}>
                  <Typography key={i} variant="caption" color="textSecondary">
                    {file.name}
                    <IconButton
                      color="error"
                      aria-label="upload picture"
                      component="label"
                      onClick={() => {
                        removerFile(i);
                        const newFiles = uploadedFiles.filter(
                          (file, idx) => idx !== i
                        );
                        formik.setFieldValue('photos', newFiles);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width={16}
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </IconButton>
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        </Grid>
        <Grid item xs={12}>
          <Box display={'flex'} mt={2} justifyContent="flex-end">
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              variant="contained"
              size="large"
              disableElevation
            >
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
