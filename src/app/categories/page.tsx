"use client";
import { deleteCategory, getCategories, useCategories } from "@/api/categories";
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
import BaseIcon from "@/components/icons/BaseIcon";
import CategoryForm from "../(components)/CategoryForm";
import { useMainState } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";

const page = () => {
  const { categories, setCategories, removeCategory } = useMainState();
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const { data, isLoading, error } = useCategories();
  const [open, setOpen] = useState<boolean>(false);
  if (error) {
    toast.error("Произошла ошибка при получении категорий");
  }

  const mutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id + 1),
    onSuccess: () => {
      removeCategory(currentCategory);
      setCurrentCategory("");
      toast.success("Категория успешно удалена");
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении категории");
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setCurrentCategory("");
    }
  }, [open]);

  function handleDelete(item: string, id: number) {
    setCurrentCategory(item);
    mutation.mutate(Number(id));
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Категории </h2>
      <div className="bg-white border border-[#E5E7EB] rounded-xl min-h-screen">
        <div className="py-3 px-6 border-b border-[#E5E7EB] flex justify-end items-center">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md"
          >
            Создать категорию
          </button>
        </div>

        {isLoading ? (
          <Loader className="h-[calc(100vh-200px)]" />
        ) : categories && categories.length === 0 ? (
          <NoList className="h-[calc(100vh-200px)]" />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">№</TableHead>
                  <TableHead className="text-center">Наименование </TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((item: string, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-semibold">{index + 1}</TableCell>
                    <TableCell className="font-semibold w-full text-center">
                      {item}
                    </TableCell>

                    <TableCell className="font-semibold flex space-x-4">
                      <button
                        onClick={() => {
                          setCurrentCategory(item);
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

                      <button onClick={() => handleDelete(item, index)}>
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

        <CategoryForm
          open={open}
          setOpen={setOpen}
          category={currentCategory}
        />
      </div>
    </div>
  );
};

export default page;
