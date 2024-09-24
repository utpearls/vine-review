"use client";
import Image from "next/image";
import {
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import useProducts from "@/hooks/products";
import ImageLoader from "@/components/imageloader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function Home() {
  const navigation = useRouter();
  const { products } = useProducts();
  const goToReview = (id: string) => {
    navigation.push(`/review/${id}`);
  };

  return (
    <Box py={6}>
      <Container>
        <Header />
        <Grid2 container spacing={2} gap={2} justifyContent="flex-start">
          <Grid2
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Link href="/my">
                <Image
                  src="https://img.freepik.com/free-vector/green-cross-geometric-shape-vector_53876-168849.jpg"
                  alt="sadf"
                  height={200}
                  width={200}
                />
              </Link>
            </Stack>
          </Grid2>

          {products.map((item: any, index: number) => (
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
              key={item.title || index}
            >
              <Stack
                gap={3}
                sx={{
                  boxShadow: "0 0 5px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  pt: "15px",
                }}
              >
                <ImageLoader path={item.image_path} />
                <Stack
                  gap={0.5}
                  pb={1}
                  sx={{ background: "#dedede", padding: "10px" }}
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>${item.price}</Typography>
                  <Stack direction="row">
                    <Button
                      variant="contained"
                      onClick={() => goToReview(item.id)}
                      size="small"
                    >
                      Review item
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
