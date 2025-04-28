"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Editor from "@/components/Editor";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import ImagesCarousel from "@/components/ImagesCarousel";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import FadeTransition from "@/components/transition/Fade";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const clearForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDiscount("");
    setIsDiscount(false);
    setImages([]);
    setContent("");
  };

  //watcher invalid data
  useEffect(() => {
    if (name.length >= 100) {
      setName(name.slice(0, 100));
      toast.error("Only allow 100 characters", {
        style: {
          backgroundColor: "var(--destructive)",
          color: "white",
          border: "none",
        },
      });
    }

    if (price.length > 4) {
      setPrice(price.slice(0, 4));
      toast.error("Price can not be 5 digits (Max: $9999)", {
        style: {
          backgroundColor: "var(--destructive)",
          color: "white",
          border: "none",
        },
      });
    }

    if (discount.length > 4) {
      setDiscount(discount.slice(0, 4));
      toast.error("Discount price can not be 5 digits (Max: $9999)", {
        style: {
          backgroundColor: "var(--destructive)",
          color: "white",
          border: "none",
        },
      });
    }

    if (content.length >= 1000) {
      setContent(content.slice(0, 1000));
      toast.error("Only allow 1000 characters", {
        style: {
          backgroundColor: "var(--destructive)",
          color: "white",
          border: "none",
        },
      });
    }
  }, [name, price, discount, content]);

  const validateForm = () => {
    const errors = [];

    if (!name || name.trim() === "") {
      errors.push("Name is required.");
    }

    if (!price || Number(price) <= 0) {
      errors.push("Price must be a positive number.");
    }

    if (!category || category.trim() === "") {
      errors.push("Category is required.");
    }

    if (isDiscount && (!discount || Number(discount) <= 0)) {
      errors.push("Discount must be a positive number if discount is enabled.");
    }

    if (images.length === 0) {
      errors.push("At least one image is required.");
    }

    if (!content || content.trim() === "") {
      errors.push("Content is required.");
    }

    return errors;
  };

  const onRemoveImage = (idx: number) => {
    const updatedImages = [...images];
    updatedImages.splice(idx, 1);
    setImages(updatedImages);
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateForm().join("\n");
    if (errors) {
      clearForm();
      toast.error(errors, {
        style: {
          backgroundColor: "var(--destructive)",
          color: "white",
          border: "none",
        },
      });
    }
    try {
      console.table({ name, price, discount, isDiscount, content, images });
      clearForm();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Category: ", category);
  }, [category]);

  return (
    <div className="flex flex-col gap-6">
      <form
        action=""
        onSubmit={handleCreateProduct}
        className="flex flex-col gap-6"
      >
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
            className=""
            disabled={name.length >= 100}
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
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Category</Label>
            <span className="text-xs text-muted-foreground">New category</span>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-gray-50 focus-visible:none w-1/2">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>

        <Card>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-discount"
              checked={isDiscount}
              onCheckedChange={(e) => setIsDiscount(e === true)}
            />
            <Label htmlFor="is-discount">Discount</Label>
          </div>

          {isDiscount && (
            <AnimatePresence>
              <FadeTransition>
                <div className="flex flex-col gap-3 p-3 border-none">
                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="discount">Discount Amount?</Label>
                    <span className="text-xs text-muted-foreground">
                      $1 - $1000
                    </span>
                  </div>
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
                </div>
              </FadeTransition>
            </AnimatePresence>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label htmlFor="discount">Description</Label>
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
              <span className="text-muted-foreground text-sm">
                {images.length ? (
                  <p>you have {images.length} photo</p>
                ) : (
                  <p className="text-destructive">photos are required</p>
                )}
              </span>
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
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
            onChange={(e) => {
              const filesList = e.target.files;
              if (filesList) {
                const newFiles = Array.from(filesList);
                setImages((prev) => [...prev, ...newFiles]);
              }
            }}
            className="hidden"
          />

          <ImagesCarousel images={images} removeImage={onRemoveImage} />
        </Card>

        <div className="flex items-center justify-center">
          <Button type="submit" className="font-bold w-1/2 z-0" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
