import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import validationSchema from './FormModel/validationSchema';
import formInitialValues from './FormModel/formInitialValues';
import { useSelector } from 'store';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSearchParams } from 'react-router-dom';
import {
  CrewSelectField,
  DatePickerField,
  InputField,
  SelectField,
  CheckBoxField,
} from './FormFields';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';

const MAX_COUNT = 5;

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const timeArray = [...range(0.25, 20, 0.25)];

const tipArray = [...range(5, 300, 5)];

export default function JobForm({ edit = false, job, handleEdit, userId }) {
  const { user } = useSelector((state) => state.auth);
  const showForForeman = user?.role_names.includes('foreman');
  const { mutate } = useSWRConfig();
  const currentValidationSchema =
    edit || !showForForeman ? validationSchema[1] : validationSchema[0];
  const [searchParams] = useSearchParams();
  const { start, end } = Object.fromEntries([...searchParams]);

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

  const filesRequestArray = (jobId) => {
    let arr = [];
    uploadedFiles.map((file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('job_id', jobId);
      arr.push(axios.post(`/api/v1/jobs/${jobId}/images`, formData));
    });

    return arr;
  };

  function _submitForm(values, actions) {
    const data = {
      date: moment(values.date).format('YYYY-MM-DD'),
      job_id: values.jobId,
      work_time: values.workTime,
      tips: values.tips,
      comments: values.comments,
      user_id: userId,
      teammates: values.teammates,
      extra_hour: values.extraHour,
      min_time: values.minTime,
      boxes: values.boxes,
    };

    const formData = new FormData();
    formData.append('image', values.images);

    axios
      .post(`/api/v1/users/${userId}/user_jobs`, { job: data })
      .then((res) => {
        if (res.data.status === 'created') {
          formData.append('job_id', res.data.job.id);
          axios
            .all(filesRequestArray(res.data.job.id))
            .then(
              axios.spread((...responses) => {
                mutate(
                  `/api/v1/users/${userId}/user_jobs?start=${start}&end=${end}`
                );
                mutate(`/api/v1/users/${userId}/available_months`);
                toast.success(res.data.message);
                setUploadedFiles([]);
                actions.resetForm();
              })
            )
            .catch((errors) => {
              console.log(errors);
            });
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function _handleSubmit(values, actions) {
    if (edit) {
      handleEdit(values, actions);
    } else {
      _submitForm(values, actions);
    }
  }

  return (
    <>
      <Typography fontWeight={600} variant="body1">
        {edit ? 'Edit job' : 'Add new job'}
      </Typography>
      <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
      <Formik
        initialValues={
          edit
            ? {
                date: moment(job.date),
                jobId: job.job_id,
                workTime: job.work_time,
                tips: job.tips,
                comments: job.comments,
                teammates: job.teammates,
                extraHour: job.extra_hour,
                minTime: job.min_time,
                boxes: job.boxes,
              }
            : formInitialValues
        }
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => {
          // console.log(values);
          return (
            <Form autoComplete="off">
              <Stack spacing={2}>
                {!edit && showForForeman && (
                  <SelectField
                    name="role"
                    label="Role at job"
                    placeholder="Role"
                    fullWidth
                    data={user?.role_names}
                  />
                )}
                <DatePickerField name="date" label="Date" fullWidth />
                <InputField name="jobId" label="Job ID" fullWidth />
                <SelectField
                  name="workTime"
                  label="Work time"
                  placeholder="Work time"
                  fullWidth
                  data={timeArray}
                />
                <Stack direction="row" gap={4} alignItems="center">
                  {/* <CheckBoxField
                    name="minTime"
                    label="Min 5h?"
                    setFieldValue={setFieldValue}
                  /> */}
                  <CheckBoxField
                    name="extraHour"
                    label="Extra 1h?"
                    setFieldValue={setFieldValue}
                  />
                  {showForForeman && (
                    <SelectField
                      name="boxes"
                      label="TV Box"
                      data={[1, 2, 3, 4, 5]}
                    />
                  )}
                </Stack>
                <SelectField
                  name="tips"
                  label="C/C Tips"
                  fullWidth
                  data={tipArray}
                />
                {showForForeman && (
                  <InputField name="comments" label="Comments" fullWidth />
                )}
                {showForForeman && (
                  <CrewSelectField
                    name="teammates"
                    label="Teammates"
                    fullWidth
                  />
                )}

                {!edit && showForForeman && values.role === 'foreman' && (
                  <>
                    {errors && errors?.image && (
                      <Typography variant="caption" color="error.main">
                        {errors?.image}
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
                          setFieldValue('image', chosenFiles);
                        }}
                        onClick={(e) => (e.target.value = '')}
                      />
                    </Button>

                    <Box>
                      {uploadedFiles.map((file, i) => (
                        <Box key={i}>
                          <Typography
                            key={i}
                            variant="caption"
                            color="textSecondary"
                          >
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
                                setFieldValue('image', newFiles);
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
                )}

                <Box display={'flex'} mt={2} justifyContent="flex-end">
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                  >
                    {edit ? 'Update Job' : 'Add Job'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
