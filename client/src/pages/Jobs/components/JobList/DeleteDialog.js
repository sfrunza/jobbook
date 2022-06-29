import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

export default function DeleteDialog({ id, monthYear }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useSWRConfig();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.message) {
        toast.success('Job Deleted');
        mutate('/api/v1/jobs');
        mutate(`/api/v1/selected-month?&my=${monthYear}`);
        handleClose();
      } else {
        toast.error(data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error('error', error);
      setLoading(false);
    }
  };

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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
              color: (theme) => theme.palette.grey[600],
              backgroundColor: 'background.level2',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to <b>delete</b> this Job?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '0px 24px 20px' }}>
          <Button onClick={handleClose} variant="outlined">
            No
          </Button>
          {/* <Button
            variant="contained"
            disableElevation
            onClick={() => {
              handleDelete(id);
            }}
          >
            Yes
          </Button> */}
          <LoadingButton
            loading={loading}
            variant="contained"
            disableElevation
            onClick={() => {
              handleDelete(id);
            }}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
