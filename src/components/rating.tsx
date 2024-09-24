import { Box, Rating } from "@mui/material";

const RatingStar = ({ setRating }: { setRating: any }) => {
  return (
    <Box>
      <Rating
        name="customized-10"
        onChange={(e, newValue) => {
          setRating(newValue);
        }}
        defaultValue={1}
        max={5}
      />
    </Box>
  );
};

export default RatingStar;
