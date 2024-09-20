"use-client";
import {
  Button,
  Container,
  Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function Home() {
  const wineList = [
    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },

    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },

    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },

    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },

    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },

    {
      image:
        "https://img.freepik.com/free-photo/front-view-pomegranate-wine-dark-wall-drink-fruit-alcohol-sour-colors-bar-restaurant-juice-wine_179666-17549.jpg",
      title: "Wine one",
      price: "50",
    },
  ];
  return (
    <Container>
      <Stack mt={2}>
        <Typography align="center" variant="h4">
          Vine Review
        </Typography>
      </Stack>

      <Grid2 container spacing={2} gap={2} justifyContent="flex-start">
        {wineList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.title || index}>
            <Image alt={item.title} height={200} width={250} src={item.image} />
            <Typography variant="h6">{item.title}</Typography>
            <Typography>${item.price}</Typography>
            <Stack direction="row">
              <Button variant="contained" size="small">
                Review item
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid2>
    </Container>
  );
}
