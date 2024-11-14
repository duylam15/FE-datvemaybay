import * as React from 'react';
import Button from '@mui/material/Button';
import { FaUnlock, FaLock } from 'react-icons/fa';
import Stack from '@mui/material/Stack';

export default function BlockBtn() {
  return (
    <Stack direction='row' spacing={2}>
      <Button
        variant='outlined'
        color='error'
        size='medium'
        startIcon={<FaLock />}
      ></Button>
    </Stack>
  );
}
