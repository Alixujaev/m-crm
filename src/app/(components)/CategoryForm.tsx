import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategorySchema } from "@/lib/schemas";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createCategory, editCategory } from "@/api/categories";
import toast from "react-hot-toast";
import { useMainState } from "@/lib/store";

type FormData = z.infer<typeof CategorySchema>;

const CategoryForm = ({
  open,
  setOpen,
  category,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category?: string;
}) => {
  const { addCategory } = useMainState();
  const form = useForm<FormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category,
    },
  });
  const mutationCreate = useMutation({
    mutationFn: (data: { name: string }) => createCategory(data),
    onSuccess: () => {
      setOpen(false);

      addCategory(form.getValues("name"));
      toast.success("Категория успешно создана");
    },
    onError: () => {
      toast.error("Произошла ошибка при создании категории");
    },
  });

  const mutationEdit = useMutation({
    mutationFn: (data: { name: string }) => editCategory(data),
    onSuccess: () => {
      setOpen(false);
      form.reset();
      addCategory(form.getValues("name"));
      toast.success("Категория успешно изменена");
    },
    onError: () => {
      toast.error("Произошла ошибка при изменении категории");
    },
  });

  useEffect(() => {
    if (category) {
      form.setValue("name", category);
    }
  }, [category]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (category) {
      mutationEdit.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl mb-10">
            {category ? "Редактирование категории" : "Создание котегория"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <label color="#374151" htmlFor="name">
              Наименование категории <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              placeholder="Введите название категории"
              className="border-[#E5E7EB] mt-1"
              {...form.register("name")}
            />
            <p className="text-red-500 text-xs mb-4">
              {form.formState.errors.name?.message}
            </p>
            {category ? (
              <button
                disabled={mutationEdit.isPending}
                className={`bg-[#28b392] hover:bg-[#28b392] text-white px-4 py-2 rounded-md w-full ${
                  mutationEdit.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Сохранить
              </button>
            ) : (
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
            )}
          </Form>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryForm;
