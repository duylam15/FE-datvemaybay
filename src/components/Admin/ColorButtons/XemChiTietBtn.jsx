import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function XemChiTietBtn() {
  return (
    <Stack direction='row' spacing={2}>
      <Button
        variant='outlined'
        color='primary' // You can use "primary" or another color
        startIcon={<RemoveRedEyeIcon />} // Use the Edit icon here
      >
        Xem chi tiết
      </Button>
    </Stack>
  );
}
