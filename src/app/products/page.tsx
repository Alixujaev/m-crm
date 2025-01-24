"use client";
import { deleteCategory, useCategories } from "@/api/categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import Loader from "../(components)/Loader";
import NoList from "../(components)/NoList";
import toast from "react-hot-toast";
import { useMainState } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct, useProducts } from "@/api/products";
import { ProductType } from "@/lib/types";
import BaseIcon from "@/components/icons/BaseIcon";
import ProductForm from "../(components)/ProductForm";

const page = () => {
  const { products, setProducts, removeProduct, addProduct } = useMainState();
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const { data, isLoading, error } = useProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [open, setOpen] = useState<boolean>(false);
  if (error) {
    toast.error("Произошла ошибка при получении категорий");
  }

  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      if (currentProduct) {
        addProduct(currentProduct);
        setCurrentProduct(null);
      }
      toast.success("Товар успешно удалена");
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении товара");
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setCurrentProduct(null);
    }
  }, [open]);

  function handleDelete(item: ProductType, id: number) {
    setCurrentProduct(item);
    removeProduct(item);
    mutation.mutate(Number(id));
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Товары </h2>
      <div className="bg-white border border-[#E5E7EB] rounded-xl min-h-screen">
        <div className="py-3 px-6 border-b border-[#E5E7EB] flex justify-end items-center">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md"
          >
            Создать товар
          </button>
        </div>

        {isLoading ? (
          <Loader className="h-[calc(100vh-200px)]" />
        ) : products && products.length === 0 ? (
          <NoList className="h-[calc(100vh-200px)]" />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">№</TableHead>
                  <TableHead className="text-center">Наименование </TableHead>
                  <TableHead className="text-center">Категория </TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((item: ProductType) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.id}</TableCell>
                    <TableCell className="font-semibold text-center">
                      {item.title}
                    </TableCell>
                    <TableCell className="font-semibold text-center">
                      {item.category}
                    </TableCell>
                    <TableCell className="font-semibold flex space-x-4 justify-end">
                      <button
                        onClick={() => {
                          setCurrentProduct(item);
                          setOpen(true);
                        }}
                      >
                        <BaseIcon
                          name="edit"
                          width={24}
                          height={24}
                          viewBox="0 0 20 20"
                        />
                      </button>

                      <button onClick={() => handleDelete(item, item.id)}>
                        <BaseIcon
                          name="delete"
                          width={24}
                          height={24}
                          viewBox="0 0 20 20"
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        <ProductForm
          open={open}
          setOpen={setOpen}
          product={currentProduct ? currentProduct : undefined}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default page;
