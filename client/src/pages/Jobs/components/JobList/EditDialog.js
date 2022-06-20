import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import FormPage from '../FormPage/index';
import { useSelector } from 'store';

export default function EditDialog({ job, monthYear }) {
  const [open, setOpen] = React.useState(false);
  const { mutate } = useSWRConfig();
  const { user } = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEdit(values, actions) {
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
      const resp = await fetch(`/api/v1/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let newJob = await resp.json();

      if (newJob.id) {
        toast.success('Job Updated');
        actions.resetForm();
        mutate('/api/v1/jobs');
        mutate(`/api/v1/selected-month?&my=${monthYear}`);
        handleClose();
      } else {
        toast.error(newJob.error);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div>
      <IconButton
        size="small"
        onClick={handleClickOpen}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ mb: 2, p: 2 }}>
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              backgroundColor: 'background.level2',
            }}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important' }}>
          <FormPage edit job={job} handleEdit={handleEdit} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            No
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              handleDelete(id);
            }}
          >
            Yes
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
