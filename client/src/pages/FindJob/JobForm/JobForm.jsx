import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import validationSchema from './FormModel/validationSchema';
import formInitialValues from './FormModel/formInitialValues';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
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

export default function JobForm({ edit = false, job, handleEdit, userId }) {
  const { mutate } = useSWRConfig();
  const currentValidationSchema = validationSchema[0];
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
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
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
                // console.log(responses);
                mutate(
                  `/api/v1/users/${userId}/user_jobs?start=${start}&end=${end}`
                );
                mutate(`/api/v1/users/${userId}/available_months`);
                toast.success(res.data.message);
              })
            )
            .catch((errors) => {
              console.log(errors);
            });

          actions.resetForm();
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
              }
            : formInitialValues
        }
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          // console.log(values);
          return (
            <Form autoComplete="off">
              <Stack spacing={2}>
                <DatePickerField name="date" label="Date" fullWidth />
                <InputField name="jobId" label="Job ID" fullWidth />
                <SelectField
                  name="workTime"
                  label="Work time"
                  placeholder="Work time"
                  fullWidth
                  data={timeArray}
                />
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <CheckBoxField
                    name="minTime"
                    label="Min 5h?"
                    setFieldValue={setFieldValue}
                  />
                  <CheckBoxField
                    name="extraHour"
                    label="Extra 1h?"
                    setFieldValue={setFieldValue}
                  />
                </Stack>
                <InputField name="tips" label="C/C Tips" fullWidth />
                <InputField name="comments" label="Comments" fullWidth />
                <CrewSelectField name="teammates" label="Teammates" fullWidth />

                {!edit && (
                  <div className="App">
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      accept="image/png, image/jpeg"
                      onChange={handleFileEvent}
                      disabled={fileLimit}
                    />

                    <label htmlFor="fileUpload">
                      <a
                        className={`btn btn-primary ${
                          !fileLimit ? '' : 'disabled'
                        } `}
                      >
                        Upload Files
                      </a>
                    </label>

                    <div className="uploaded-files-list">
                      {uploadedFiles.map((file, i) => (
                        <div key={i}>{file.name}</div>
                      ))}
                    </div>
                  </div>
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
