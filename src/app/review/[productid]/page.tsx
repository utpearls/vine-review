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

const MyPage = () => {
  const searchParams = useParams();
  const params = useRouter();
  const { getProductById, success, loading } = useProducts();
  const [productDetail, setProductDetail] = useState<{
    title: string;
    price: number;
    image_path: string;
  }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const { productid } = searchParams;
  const productId = Number(productid);

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

  const handleFormSubmit = () => {};

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
        <Formik
          initialValues={{ title: "", price: "", file: null }}
          validationSchema={uploadProductValidation}
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
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Typography variant="h4">
                        {productDetail?.title} ${productDetail?.price}
                      </Typography>
                      <Typography fontSize={15}>
                        <Link href="/"> Back</Link>
                      </Typography>
                    </Stack>
                    <Stack gap={2}>
                      <Typography>
                        S simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining
                        essentially unchanged
                      </Typography>

                      <Typography variant="h5">Place your review </Typography>
                    </Stack>
                  </Grid2>

                  {/* Second grid with image */}
                  <Grid2 size={{ xs: 6 }}>
                    <ImageLoader path={productDetail?.image_path as string} />
                  </Grid2>
                </Grid2>
              </Box>
            </form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default MyPage;
