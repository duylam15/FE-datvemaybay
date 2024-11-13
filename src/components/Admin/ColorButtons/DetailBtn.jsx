import React from "react";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon
import Stack from "@mui/material/Stack"; // Stack layout component

export default function DetailBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<VisibilityIcon />}
        size="small"
        sx={{ fontSize: '1rem' }}
      >
        Detail
      </Button>
    </Stack>
  );
}
