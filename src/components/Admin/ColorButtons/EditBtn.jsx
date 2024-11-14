import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

export default function EditBtn() {
  return (
    <Stack direction='row' spacing={2}>
      <Button
        variant='outlined'
        color='primary' // You can use "primary" or another color
        startIcon={<EditIcon />} // Use the Edit icon here
      >
        Edit
      </Button>
    </Stack>
  );
}
