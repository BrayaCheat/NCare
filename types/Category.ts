import { Product } from "./Product";

export interface Category {
  id: number,
  name: string,
  products: Product[],
  createdAt: Date,
  updatedAt: Date,
  userId: string
}