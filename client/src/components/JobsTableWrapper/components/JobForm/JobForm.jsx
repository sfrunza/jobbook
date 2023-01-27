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
import { useSearchParams } from 'react-router-dom';
import {
  CrewSelectField,
  DatePickerField,
  InputField,
  SelectField,
  CheckBoxField,
} from './FormFields';
import axios from 'axios';

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const timeArray = [...range(0.25, 20, 0.25)];

export default function JobForm({ edit = false, job, handleEdit, userId }) {
  const { mutate } = useSWRConfig();
  const currentValidationSchema = validationSchema[0];
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const { start, end } = Object.fromEntries([...searchParams]);

  function _submitForm(values, actions) {
    const data = {
      date: values.date,
      job_id: values.jobId,
      work_time: values.workTime,
      tips: values.tips,
      comments: values.comments,
      user_id: userId,
      teammates: values.teammates,
      extra_hour: values.extraHour,
      min_time: values.minTime,
    };

    axios
      .post(`/api/v1/users/${userId}/user_jobs`, { job: data })
      .then((res) => {
        // console.log(res);
        if (res.data.status === 'created') {
          toast.success(res.data.message);
          mutate(`/api/v1/users/${userId}/user_jobs?start=${start}&end=${end}`);
          mutate(`/api/v1/users/${userId}/available_months`);
          actions.resetForm();
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // try {
    //   const resp = await fetch(`/api/v1/users/${userId}/user_jobs`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   let newJob = await resp.json();

    //   if (newJob.id) {
    //     toast.success('Job Added');
    //     actions.resetForm();
    //     mutate(`/api/v1/users/${userId}/user_jobs?month=${month}&year=${year}`);
    //     mutate(`/api/v1/users/${userId}/available_months`);
    //   } else {
    //     toast.error(newJob.error);
    //   }

    //   actions.setSubmitting(false);
    // } catch (error) {
    //   console.error('error', error);
    // }
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
                date: job.date,
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
        {({ isSubmitting }) => {
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
                <Stack direction="row" gap={4}>
                  <CheckBoxField name="minTime" label="Min 5h?" />
                  <CheckBoxField name="extraHour" label="Extra 1h?" />
                </Stack>
                <InputField name="tips" label="C/C Tips" fullWidth />
                <InputField name="comments" label="Comments" fullWidth />
                <CrewSelectField name="teammates" label="Teammates" fullWidth />
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
