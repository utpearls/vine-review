"use client";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useFileUpload from "@/hooks/storage";
import useProducts from "@/hooks/products";
import Image from "next/image";
import { Formik, Field } from "formik";
import { styled } from "@mui/material/styles";
import { uploadProductValidation } from "@/validations/uploadProducts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Grid2,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const MyPage = () => {
  const { uploadFile } = useFileUpload();
  const navigation = useRouter();
  const { createProduct, success, loading } = useProducts();
  const [previewFile, setPreviewFile] = useState<any>(null);

  const handleUploadImage = async (event: any, setFieldValue: any) => {
    setFieldValue("file", event.target.files[0]);
    setPreviewFile(event.target.files[0]);
  };

  const handleFormSubmit = async (values: any) => {
    const result = await uploadFile(values.file);

    if (result && result.path) {
      await createProduct({
        title: values.title,
        price: values.price,
        image_path: result.path,
      });

      navigation.push("/");
    }

    if (success) {
      console.log("product created");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
                  <Grid2 size={{ xs: 6 }}>
                    <Stack
                      gap={2}
                      sx={{ height: "100%", justifyContent: "center" }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h4">Upload</Typography>
                        <Typography>
                          <Link href="/"> Back </Link>{" "}
                        </Typography>
                      </Stack>

                      <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 6 }}>
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
                        </Grid2>
                        <Grid2 size={{ xs: 6 }}>
                          <Box>
                            <Field
                              as={TextField}
                              id="price"
                              name="price"
                              label="Price"
                              fullWidth
                              onChange={handleChange}
                              type="number"
                              variant="outlined"
                            />
                            {errors.price && touched.price && (
                              <Typography color="red" fontSize={14}>
                                {errors.price}
                              </Typography>
                            )}
                          </Box>
                        </Grid2>
                      </Grid2>

                      <Stack pt="4">
                        <Button
                          component="label"
                          variant="outlined"
                          sx={{ marginTop: "20px" }}
                          size="large"
                          startIcon={<AddPhotoAlternateIcon />}
                        >
                          <VisuallyHiddenInput
                            type="file"
                            name="file"
                            accept="images/jpeg"
                            onChange={(event) =>
                              handleUploadImage(event, setFieldValue)
                            }
                          />
                          Upload File
                        </Button>
                        {errors.file && touched.file && (
                          <Typography color="red" fontSize={14}>
                            {errors.file}
                          </Typography>
                        )}
                      </Stack>

                      <Stack>
                        <Button type="submit" variant="contained">
                          {loading ? "Saving ..." : "Save"}
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid2>

                  {/* Second grid with image */}
                  <Grid2 size={{ xs: 6 }}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      {previewFile ? (
                        <Image
                          alt="hello"
                          height={200}
                          width={250}
                          src={URL.createObjectURL(previewFile)}
                        />
                      ) : (
                        "Preview"
                      )}
                    </Stack>
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
