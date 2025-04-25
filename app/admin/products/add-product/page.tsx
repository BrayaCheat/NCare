"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Editor from "@/components/Editor";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import ImagesCarousel from "@/components/ImagesCarousel";
import { toast } from "sonner";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const clearForm = () => {
    setName("");
    setPrice("");
    setDiscount("");
    setIsDiscount(false);
    setImages([]);
    setContent("");
  };

  const validateForm = () => {
    const errors = [];

    if (!name || name.trim() === "") {
      errors.push("Name is required.");
    }

    if (!price || Number(price) <= 0) {
      errors.push("Price must be a positive number.");
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
    console.log(errors);
    toast("", {
      description: errors,
      style: {
        backgroundColor: "var(--destructive)",
        color: "white",
        border: "none",
      },
      type: "error",
    });
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

  return (
    <div className="flex flex-col gap-6">
      <form
        action=""
        onSubmit={handleCreateProduct}
        className="flex flex-col gap-6"
      >
        <Card>
          <Label htmlFor="product-name">Product name</Label>
          <Input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Serum"
          />
        </Card>

        <Card>
          <Label htmlFor="price">Price</Label>
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-discount"
              checked={isDiscount}
              onCheckedChange={(e) => setIsDiscount(e === true)}
            />
            <Label htmlFor="is-discount">Discount</Label>
          </div>

          {isDiscount && (
            <div className="flex flex-col gap-3 p-3 border-none">
              <Separator />
              <Label htmlFor="discount">Discount Amount?</Label>
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
          )}
        </Card>

        <Card>
          <Label>Description</Label>
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
            <Label htmlFor="upload-photos">
              <Plus
                width={30}
                height={30}
                className="p-1 bg-primary text-secondary rounded-full"
              />
            </Label>
          </div>
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

        <Button type="submit" className="font-bold" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Confirm"}
        </Button>
      </form>
    </div>
  );
}
