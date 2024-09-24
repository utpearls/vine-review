"use client";
import Image from "next/image";
import {
  Button,
  Container,
  Grid2,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useProducts from "@/hooks/products";
import useFileUpload from "@/hooks/storage";
import { useEffect } from "react";
import ImageLoader from "@/components/imageloader";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigation = useRouter();
  const { products } = useProducts();
  const { getSingleFile } = useFileUpload();
  console.log("products", products);

  const goToReview = (id: string) => {
    navigation.push(`/review/${id}`);
  };

  useEffect(() => {}, []);
  return (
    <Container>
      <Stack mt={2} padding={3}>
        <Typography align="center" variant="h4">
          Vine Review
        </Typography>
      </Stack>

      <Grid2 container spacing={2} gap={2} justifyContent="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/my">
            <Image
              src="https://img.freepik.com/free-vector/green-cross-geometric-shape-vector_53876-168849.jpg"
              alt="sadf"
              height={200}
              width={200}
            />
          </Link>
        </Grid>

        {products.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={item.title || index}>
            <ImageLoader path={item.image_path} />
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
          </Grid>
        ))}
      </Grid2>
    </Container>
  );
}
