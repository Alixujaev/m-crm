"use client";
import { getCategories, useCategories } from "@/api/categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../(components)/Loader";
import NoList from "../(components)/NoList";
import toast from "react-hot-toast";
import BaseIcon from "@/components/icons/BaseIcon";

const page = () => {
  const { data, isLoading, error } = useCategories();

  if (error) {
    toast.error("Произошла ошибка при получении категорий");
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Категории </h2>
      <div className="bg-white border border-[#E5E7EB] rounded-xl min-h-screen">
        <div className="py-3 px-6 border-b border-[#E5E7EB] flex justify-end items-center">
          <button className="bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md">
            Create new store
          </button>
        </div>

        {isLoading ? (
          <Loader className="h-[calc(100vh-200px)]" />
        ) : data && data.length === 0 ? (
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
                {data?.map((item: string, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-semibold">{index + 1}</TableCell>
                    <TableCell className="font-semibold w-full text-center">
                      {item}
                    </TableCell>

                    <TableCell className="font-semibold flex space-x-4">
                      <button>
                        <BaseIcon
                          name="edit"
                          width={24}
                          height={24}
                          viewBox="0 0 20 20"
                        />
                      </button>

                      <button>
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
      </div>
    </div>
  );
};

export default page;
