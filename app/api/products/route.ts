import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { supabaseServer } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const userId = formData.get("userId") as string;
    const isDiscount = formData.get("isDiscount") === "true";
    const discountPrice =
      parseFloat(formData.get("discountPrice") as string) || 0;
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as File[];

    // small check
    if (!name || !price || !categoryId || !userId || images.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // save product
    const savedProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        userId,
        isDiscount,
        discountPrice,
        description,
      },
    });

    // upload to bucket
    const imagesURL: string[] = [];
    for (const image of images) {
      const fileExt = image.name.split(".").pop() || "png";
      const uniqueFilename = `products/${uuidv4()}.${fileExt}`;

      const { data, error } = await supabaseServer.storage
        .from("bucket")
        .upload(uniqueFilename, image, {
          upsert: true,
        });
      if (error) {
        console.error("Failed to upload image: ", error);
        throw new Error("Image upload failed");
      }
      imagesURL.push(data.path);
    }

    // save image
    await prisma.image.createMany({
      data: imagesURL.map((url) => ({
        productId: savedProduct.id,
        userId: userId,
        url: url,
      })),
    });

    console.log({
      name,
      price,
      categoryId,
      userId,
      isDiscount,
      discountPrice,
      description,
      images,
    });
    return NextResponse.json({
      message: "Product created successfully",
      product: savedProduct,
      images: imagesURL,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true
      }
    });
    return NextResponse.json({
      message: "Fetching products successfully",
      products,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

