import useFileUpload from "@/hooks/storage";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageLoader = ({ path }: { path: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const { getSingleFile } = useFileUpload();

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getSingleFile(path); // Fetch the image URL using the path
      setImageUrl(url); // Store the URL in the state
    };

    fetchImageUrl(); // Fetch the image URL when the component mounts
  }, [path]); // Run effect whenever the path changes

  return (
    <div>
      {imageUrl ? (
        <Image alt="heloo 123" height={250} width={250} src={imageUrl} />
      ) : (
        <Skeleton variant="rectangular" width={210} height={250} />
      )}
    </div>
  );
};

export default ImageLoader;
