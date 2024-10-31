import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<SearchIcon />}
        size="large"
        sx={{ fontSize: '1.25rem' }}  
      >
        Tìm kiếm
      </Button>
    </Stack>
  );
}
