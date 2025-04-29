import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json({
        message: "Invalid product id",
      });
    }
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        images: true
      }
    });
    return NextResponse.json({
      message: "Receive product id: " + id,
      product,
    });
  } catch (error) {
    console.log(error);
  }
}
