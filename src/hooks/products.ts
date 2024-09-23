import { useState, useEffect } from "react";
import supabase from "@/supabase";
import { createProductType } from "@/types/product";
import { StatusCodes } from "http-status-codes";

const useProducts = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<number>();

  const tableName = "products";

  // Function to fetch all products
  const fetchProducts = async () => {
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

  const getProductById = async (id: number) => {
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
  const createProduct = async (newProduct: createProductType) => {
    setLoading(true);
    setError(null);

    const { error, status } = await supabase
      .from(tableName)
      .insert([newProduct]);

    if (status == StatusCodes.CREATED) {
      setSuccess(true);
    }

    if (error?.message) {
      setError(error?.message);
    }

    setLoading(false);
  };

  // Function to update a product
  const updateProduct = async (id: string, updatedProduct: any) => {
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
  const deleteProduct = async (id: string) => {
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
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    success,
  };
};

export default useProducts;
