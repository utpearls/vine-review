"use client";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useFileUpload from "@/hooks/storage";
import useProducts from "@/hooks/products";
import Image from "next/image";
import { Formik, Field } from "formik";
import { styled } from "@mui/material/styles";
import { uploadProductValidation } from "@/validations/uploadProducts";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ImageLoader from "@/components/imageloader";
import { submitReview } from "@/validations/submitReview";
import useReviews from "@/hooks/reviews";
import RatingStar from "@/components/rating";
import ReviewList from "@/components/reviewList";

const ReviewPage = () => {
  const searchParams = useParams();
  const { getProductById, success, loading } = useProducts();
  const { createReview } = useReviews();
  const [productDetail, setProductDetail] = useState<{
    title: string;
    price: number;
    image_path: string;
  }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [rating, setRating] = useState(1);
  const { productid } = searchParams;
  const productId = Number(productid);
  const [refetchReview, setRefetchReview] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const result = await getProductById(productId);

      if (result) {
        setIsLoaded(true);
        setProductDetail(result);
      }
    };

    if (!isLoaded) {
      getProduct();
    }
  }, [productDetail]);

  const handleFormSubmit = async (values: any) => {
    await createReview({
      title: values.title,
      description: values.description,
      product_id: productId,
      rating: rating,
    });

    setRefetchReview(true);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          padding: "40px 0",
        }}
      >
        <Box width="100%">
          <Grid2
            container
            sx={{
              position: "relative",
              "&:before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
                background: "#ccc",
                width: "1px",
              },
            }}
            spacing={5}
          >
            {/* First grid with form elements */}
            <Grid2 size={{ xs: 6 }} gap={4}>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography variant="h4">
                  {productDetail?.title} ${productDetail?.price}
                </Typography>
                <Typography fontSize={15}>
                  <Link href="/"> Back</Link>
                </Typography>
              </Stack>
              <Stack gap={4} pb={2}>
                <Typography>
                  S simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged
                </Typography>

                <Typography variant="h6">Place your review </Typography>
              </Stack>

              <Stack gap={2} mb={4}>
                <RatingStar setRating={setRating} />

                <Formik
                  initialValues={{ title: "", description: "", rating: 0 }}
                  validationSchema={submitReview}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                  }) => (
                    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                      <Stack gap={4}>
                        <Box>
                          <Field
                            as={TextField}
                            id="title"
                            name="title"
                            label="Title"
                            onChange={handleChange}
                            fullWidth
                            type="text"
                            variant="outlined"
                          />
                          {errors.title && touched.title && (
                            <Typography color="red" fontSize={14}>
                              {errors.title}
                            </Typography>
                          )}
                        </Box>

                        <Box>
                          <Field
                            as={TextField}
                            id="title"
                            name="description"
                            label="Description"
                            onChange={handleChange}
                            fullWidth
                            rows={5}
                            type="text"
                            variant="outlined"
                            multiline
                          />
                        </Box>
                        <Box>
                          <Button fullWidth type="submit" variant="contained">
                            {loading ? "Saving ..." : "Save"}
                          </Button>
                        </Box>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </Stack>
              <ReviewList refetch={refetchReview} />
            </Grid2>

            {/* Second grid with image */}
            <Grid2 size={{ xs: 6 }}>
              <ImageLoader path={productDetail?.image_path as string} />
            </Grid2>
          </Grid2>
        </Box>
      </Stack>
    </Container>
  );
};

export default ReviewPage;
