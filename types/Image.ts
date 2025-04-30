import { Product } from "./Product";

export interface Image {
  id: number,
  url?: string,
  productId: number,
  product: Product,
  createdAt: Date,
  userId: string
}