
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({count}) {
    return (
      <Stack spacing={2}>
        <Pagination count={count} variant="outlined" shape="rounded" />
      </Stack>
    );
  }