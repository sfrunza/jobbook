import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import validationSchema from './FormModel/validationSchema';
import formInitialValues from './FormModel/formInitialValues';
import {
  CrewSelectField,
  DatePickerField,
  InputField,
  SelectField,
} from './FormFields';
import { useSelector } from 'store';
import { LoadingButton } from '@mui/lab';

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const timeArray = [...range(0.25, 20, 0.25)];

export default function FormPage({ edit = false, job, handleEdit }) {
  const { mutate } = useSWRConfig();
  const currentValidationSchema = validationSchema[0];
  const { user } = useSelector((state) => state.auth);

  async function _submitForm(values, actions) {
    const data = {
      date: values.date,
      job_id: values.jobId,
      work_time: values.workTime,
      tips: values.tips,
      comments: values.comments,
      user_id: user.id,
      teammates: values.teammates,
    };
    try {
      const resp = await fetch('/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let newJob = await resp.json();

      if (newJob.id) {
        toast.success('Job Added');
        actions.resetForm();
        mutate('/api/v1/jobs');
      } else {
        toast.error(newJob.error);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.error('error', error);
    }
  }

  function _handleSubmit(values, actions) {
    if (edit) {
      handleEdit(values, actions);
    } else {
      _submitForm(values, actions);
    }
  }

  return (
    <React.Fragment>
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
              }
            : formInitialValues
        }
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DatePickerField name="date" label="Date" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="jobId" label="Job ID" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <SelectField
                    name="workTime"
                    label="Work time"
                    placeholder="Work time"
                    fullWidth
                    data={timeArray}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="tips" label="C/C Tips" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="comments" label="Comments" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <CrewSelectField
                    name="teammates"
                    label="Teammates"
                    fullWidth
                  />
                </Grid>
              </Grid>
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
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
