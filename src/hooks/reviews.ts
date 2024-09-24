import { useState, useEffect } from "react";
import supabase from "@/supabase";
import { createProductType } from "@/types/product";
import { StatusCodes } from "http-status-codes";
import { createReviewType } from "@/types/review";

const useReviews = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<number>();
  const tableName = "reviews";

  // Function to fetch all products
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    const { data, error, status } = await supabase
      .from(tableName)
      .select("*")
      .order("id", {
        ascending: false,
      });

    setStatus(status);

    if (error) {
      setError(error.message);
      setProducts([]);
    } else {
      setProducts(data);
    }

    setLoading(false);
  };

  const getReviewById = async (id: number) => {
    setLoading(true);
    setError(null);

    const { data, error, status } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", id)
      .single();

    setStatus(status);
    setLoading(false);
    if (error) {
      setError(error.message);
      return null;
    } else {
      return data;
    }
  };

  // Function to create a new product
  const createReview = async (data: createReviewType) => {
    setLoading(true);
    setError(null);

    const { error, status } = await supabase.from(tableName).insert([data]);

    if (status == StatusCodes.CREATED) {
      setSuccess(true);
    }

    if (error?.message) {
      setError(error?.message);
    }

    setLoading(false);
  };

  // Function to update a product
  const updateReview = async (id: string, updatedProduct: any) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from(tableName) // Replace with your table name
      .update(updatedProduct)
      .match({ id });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setProducts((prev: any) =>
        prev.map((product: any) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    }
  };

  // Function to delete a product
  const deleteReview = async (id: string) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from(tableName) // Replace with your table name
      .delete()
      .match({ id });

    setLoading(false);

    if (error) {
      setError(error.message);
    }

    return true;
  };

  // Fetch products on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    products,
    loading,
    error,
    createReview,
    updateReview,
    deleteReview,
    getReviewById,
    success,
    status,
  };
};

export default useReviews;
