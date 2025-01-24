import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductSchema } from "@/lib/schemas";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMainState } from "@/lib/store";
import { ProductType } from "@/lib/types";
import { createProduct, editProduct } from "@/api/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormData = z.infer<typeof ProductSchema>;

const ProductForm = ({
  open,
  setOpen,
  product,
  categories,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product?: ProductType;
  categories: string[];
}) => {
  const { addProduct, products } = useMainState();
  const form = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      category: product?.category || "",
      title: product?.title || "",
      description: product?.description || "",
      thumbnail: product?.thumbnail || "",
    },
  });
  const mutationCreate = useMutation({
    mutationFn: (data: Omit<ProductType, "id">) => createProduct(data),
    onSuccess: () => {
      setOpen(false);
      addProduct({ ...form.getValues(), id: products.length + 1 });
      form.reset();
      toast.success("Товар успешно создан");
    },
    onError: () => {
      toast.error("Произошла ошибка при создании товара");
    },
  });

  const mutationEdit = useMutation({
    mutationFn: (data: Omit<ProductType, "id">) => editProduct(data),
    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success("Товар успешно изменен");
    },
    onError: () => {
      toast.error("Произошла ошибка при изменении товара");
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue("category", product.category);
      form.setValue("title", product.title);
      form.setValue("description", product.description);
      form.setValue("thumbnail", product.thumbnail);
    }
  }, [product]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (product) {
      mutationEdit.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  function handleImageSet(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file.name);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(false);
        form.reset();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl mb-10">
            {product ? "Редактирование товара" : "Создание товара"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <div className="mb-4">
              <Select
                onValueChange={(item) => form.setValue("category", item)}
                defaultValue={product?.category ? product?.category : ""}
              >
                <label color="#374151">
                  Категория <span className="text-red-500">*</span>
                </label>
                <SelectTrigger className="w-full mt-1 border-[#E5E7EB]">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.length
                    ? categories.map((item: string) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            </div>
            <label color="#374151" htmlFor="name">
              Наименование товара <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              placeholder="Введите название товара"
              className="border-[#E5E7EB] mt-1"
              {...form.register("title")}
            />
            <p className="text-red-500 text-xs mb-4">
              {form.formState.errors.title?.message}
            </p>
            <label color="#374151" htmlFor="description">
              Описание <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Введите название товара"
              className="border-[#E5E7EB] mt-1 h-[100px]"
              {...form.register("description")}
            />
            <p className="text-red-500 text-xs mb-4">
              {form.formState.errors.description?.message}
            </p>

            <label color="#374151" htmlFor="description">
              Фото <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              className="mb-2"
              onChange={(e) => handleImageSet(e)}
            />
            <p className="text-red-500 text-xs mb-4">
              {form.formState.errors.thumbnail?.message}
            </p>
            {product ? (
              <div className="flex gap-4">
                <button
                  disabled={mutationEdit.isPending}
                  className={`bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md w-full ${
                    mutationEdit.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={mutationEdit.isPending}
                  className={`bg-[#FF5C5C] hover:bg-[#FF5C5C] text-white px-4 py-2 rounded-md w-full ${
                    mutationEdit.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Отменить
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  disabled={mutationCreate.isPending}
                  className={`bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md w-full ${
                    mutationCreate.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Создать
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={mutationCreate.isPending}
                  className={`bg-[#FF5C5C] hover:bg-[#FF5C5C] text-white px-4 py-2 rounded-md w-full ${
                    mutationCreate.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Отменить
                </button>
              </div>
            )}
          </Form>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ProductForm;
