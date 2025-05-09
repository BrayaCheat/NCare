"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Editor from "@/components/Editor";
import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImagesCarousel from "@/components/ImagesCarousel";
import { toast } from "sonner";
import { ERROR_TOAST } from "@/app/utils/helper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Plus } from "lucide-react";
import useUserStore from "@/app/store/user";
import { Category } from "@/types/Category";
import Link from "next/link";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);
  const [discount, setDiscount] = useState<string>("");
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();

  const clearForm = () => {
    setName("");
    setPrice("");
    setSelectedCategory("");
    setDiscount("");
    setIsDiscount(false);
    setImages([]);
    setContent("");
  };

  // validate when user input
  useEffect(() => {
    if (name.length >= 100) {
      setName(name.slice(0, 100));
      toast.error("Only allow 100 characters", ERROR_TOAST);
    }

    if (price.length > 4) {
      setPrice(price.slice(0, 4));
      toast.error("Price can not be 5 digits (Max: $9999)", ERROR_TOAST);
    }

    if (discount.length > 4) {
      setDiscount(discount.slice(0, 4));
      toast.error(
        "Discount price can not be 5 digits (Max: $9999)",
        ERROR_TOAST
      );
    }

    if (content.length >= 1000) {
      setContent(content.slice(0, 1000));
      toast.error("Only allow 1000 characters", ERROR_TOAST);
    }
  }, [name, price, content, discount]);

  // validate when user submit
  const validateForm = () => {
    const errors = [];

    if (!name || name.trim() === "") {
      errors.push("Name is required.");
    }

    if (!price || Number(price) <= 0) {
      errors.push("Price must be a positive number.");
    }

    if (!selectedCategory || selectedCategory.trim() === "") {
      errors.push("Category is required.");
    }

    if (isDiscount && (!discount || Number(discount) <= 0)) {
      errors.push("Discount must be a positive number if discount is enabled.");
    }

    if (images.length === 0) {
      errors.push("At least one image is required.");
    }

    if (!content || content.trim() === "") {
      errors.push("Description is required.");
    }

    return errors;
  };

  const onRemoveImage = (idx: number) => {
    const updatedImages = [...images];
    updatedImages.splice(idx, 1);
    setImages(updatedImages);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm().join("\n");
    if (errors) {
      toast.error(errors, ERROR_TOAST);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", selectedCategory); // Using ID instead of name
      formData.append("isDiscount", String(isDiscount));
      formData.append("discountPrice", discount);
      formData.append("description", content);
      formData.append("userId", user?.id || "");
      images.map((image) => formData.append("images", image));
      setLoading(true);
      const res = await fetch(`/api/products`, {
        method: "POST",
        body: formData,
      });
      clearForm();
      console.log("Response back: ", res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCreateProduct} className="flex flex-col gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <Label htmlFor="product-name">Product name</Label>
            <span className="text-xs text-muted-foreground">
              {name.length} / 100
            </span>
          </div>
          <Input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Serum"
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Price</Label>
            <span className="text-xs text-muted-foreground">$1 - $1000</span>
          </div>
          <Input
            id="price"
            type="text"
            value={price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              setPrice(value);
            }}
            placeholder="$100"
          />

          {/* discount section */}
          {/* <div className="flex items-center space-x-2">
            <Checkbox
              id="is-discount"
              checked={isDiscount}
              onCheckedChange={(e) => setIsDiscount(e === true)}
            />
            <Label htmlFor="is-discount">Discount</Label>
          </div>

          {isDiscount && (
            <AnimatePresence mode="wait" initial={false}>
              <FadeTransition>
                  <Input
                    id="discount"
                    type="text"
                    value={discount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, "");
                      setDiscount(value);
                    }}
                    placeholder="$3"
                  />
              </FadeTransition>
            </AnimatePresence>
          )} */}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Category</Label>
            <Link href={"/admin/categories/add-category"}>
              <Plus size={18} />
            </Link>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-gray-50 focus-visible:none w-1/2">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                {category.length > 0 &&
                  category.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      <span className="flex-1">{item.name}</span>
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label>Description</Label>
            <span className="text-xs text-muted-foreground">
              {content.trim().length} / 1000
            </span>
          </div>
          <Editor content={content} onChange={(html) => setContent(html)} />
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <Label>Photos</Label>
            </div>

            <span className="text-xs text-muted-foreground">
              {images.length} - 5 Photos
            </span>
          </div>

          {/* drop zone file */}
          {images.length < 5 && (
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="upload-photos"
                className="flex flex-col items-center justify-center w-full h-64 border rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              </Label>
            </div>
          )}

          <Input
            id="upload-photos"
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              const MAX_FILES = 5;
              const filesList = e.target.files;
              if (filesList) {
                const newFiles = Array.from(filesList).slice(0, MAX_FILES);
                setImages((prev) => [...prev, ...newFiles]);
              }
            }}
            className="hidden"
          />

          <ImagesCarousel images={images} removeImage={onRemoveImage} />
        </Card>

        <div className="flex items-center justify-center sticky z-50 bottom-0 pb-3">
          <Button
            type="submit"
            className="font-bold w-1/2 cursor-pointer"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
