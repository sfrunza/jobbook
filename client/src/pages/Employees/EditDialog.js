import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import NewUserForm from './NewUserForm';
import { useSelector } from 'store';

export default function EditDialog({ user, currentTab }) {
  const [open, setOpen] = React.useState(false);
  const { mutate } = useSWRConfig();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEdit(values, actions) {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      role: values.role,
      admin: false,
      username: values.username,
    };
    try {
      const resp = await fetch(`/api/v1/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let newUser = await resp.json();

      if (newUser.id) {
        toast.success('Job Updated');
        actions.resetForm();
        mutate(`/api/v1/filter-users?&role=${currentTab}`);
        handleClose();
      } else {
        toast.error(newUser.error);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
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
          <NewUserForm edit user={user} handleEdit={handleEdit} />
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
