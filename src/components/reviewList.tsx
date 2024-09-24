import { Box, Divider, Stack, Typography } from "@mui/material";
import RatingReadOnly from "./ratingReadonly";
import useReviews from "@/hooks/reviews";
import { useEffect } from "react";

const ReviewList = ({ refetch }: { refetch: boolean }) => {
  const { reviews, fetchReviewsByProductId } = useReviews();

  useEffect(() => {
    fetchReviewsByProductId();
  }, [refetch]);
  if (!reviews.length) {
    return <></>;
  }

  return (
    <Box gap={4}>
      <Typography sx={{ paddingBottom: "20px" }} variant="h6">
        All Reviews
      </Typography>

      {reviews.map((item: any) => (
        <Stack gap={1}>
          <RatingReadOnly value={item.rating} />
          <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
          <Typography>{item.description}</Typography>
          <Divider />
        </Stack>
      ))}
    </Box>
  );
};

export default ReviewList;
