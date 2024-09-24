"use client";
import { Formik, Field } from "formik";
import { useRouter } from "next/navigation";
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
import { loginValidation } from "@/validations/login";
import supabase from "@/supabase";
import useSession from "@/utils/checkSession";

const Login = () => {
  const navigation = useRouter();

  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    navigation.push("/");
  }

  const handleFormSubmit = async (values: any) => {
    let { data, error } = await supabase.auth.signInWithPassword(values);
    if (data) {
      navigation.push("/");
    }
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidation}
          onSubmit={handleFormSubmit}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
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
                        <Typography variant="h4">Login</Typography>
                        <Typography>
                          <Link href="/"> Back </Link>{" "}
                        </Typography>
                      </Stack>

                      <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 6 }}>
                          <Box>
                            <Field
                              as={TextField}
                              id="email"
                              name="email"
                              label="Email"
                              onChange={handleChange}
                              fullWidth
                              type="email"
                              variant="outlined"
                            />
                            {errors.email && touched.email && (
                              <Typography color="red" fontSize={14}>
                                {errors.email}
                              </Typography>
                            )}
                          </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 6 }}>
                          <Box>
                            <Field
                              as={TextField}
                              id="password"
                              name="password"
                              label="Password"
                              fullWidth
                              onChange={handleChange}
                              type="text"
                              variant="outlined"
                            />
                            {errors.password && touched.password && (
                              <Typography color="red" fontSize={14}>
                                {errors.password}
                              </Typography>
                            )}
                          </Box>
                        </Grid2>
                      </Grid2>

                      <Stack>
                        <Button type="submit" variant="contained">
                          Login
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid2>

                  {/* Second grid with image */}
                  <Grid2 size={{ xs: 6 }}>
                    <Stack alignContent="center" justifyContent="center">
                      <Typography variant="h5">
                        Explore best wine products and review it ....
                      </Typography>
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

export default Login;
