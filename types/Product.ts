import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isDiscount: boolean;
  discountPrice?: number;
  images?: Image[];
  category?: Category;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}