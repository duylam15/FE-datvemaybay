import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function DeleteBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="error" 
        size="medium"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </Stack>
  );
}
