import { useState } from "react";
import supabase from "@/supabase";

const useFileUpload = () => {
  const [loading, setUploading] = useState(false);
  const [message, setMessage] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [files, setFiles] = useState([]);
  const [singleFileUrl, setSingleFileUrl] = useState<string | null>("");
  const bucketName = "vine";

  const uploadFile = async (file: any) => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${Math.random()}_${file.name}`, file);
    setUploading(false);

    if (error) {
      setError(error?.message);
      setMessage("Upload failed.");
    } else {
      setMessage("File uploaded successfully!");
    }

    return data;
  };

  const getFiles = async () => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list("public");

    if (error) {
      setError(error.message);
      setFiles([]);
    } else {
      setFiles(data as []);
      setMessage("Files fetched successfully!");
    }
  };

  const getSingleFile = async (path: string) => {
    setUploading(true);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, 60 * 60); // URL valid for 1 hour (3600 seconds)

    if (error) {
      setError(error.message);
    }

    setUploading(false);
    return data?.signedUrl || null;
  };

  return {
    loading,
    message,
    error,
    uploadFile,
    singleFileUrl,
    files,
    getSingleFile,
    getFiles,
  };
};

export default useFileUpload;
