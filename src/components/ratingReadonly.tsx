import { Box, Rating } from "@mui/material";

const RatingReadOnly = ({ value }: { value: number }) => {
  return (
    <Rating
      sx={{ marginTop: "10px" }}
      name="read-only"
      value={value}
      readOnly
    />
  );
};

export default RatingReadOnly;
