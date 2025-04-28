import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../singleton/prisma";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const categoryId = formData.get('categoryId') as string;
  const userId = formData.get('userId') as string;
  const isDiscount = formData.get('isDiscount');
  const discountPrice = formData.get('discountPrice') as string;
  const description = formData.get('description') as string;
  const images = formData.getAll('images') as File[];

  console.log(
    {
      name,
      price,
      categoryId,
      userId,
      isDiscount,
      discountPrice,
      description,
      images,
    }
  )
  return NextResponse.json({
    name,
    price,
    categoryId,
    userId,
    isDiscount,
    discountPrice,
    description,
    images,
  });
}
