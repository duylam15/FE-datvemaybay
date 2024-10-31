import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        size="large"
        sx={{ fontSize: '1.25rem' }}  // Increase font size here
      >
        Thêm
      </Button>
    </Stack>
  );
}