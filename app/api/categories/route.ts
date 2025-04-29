import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET() {
  try {
    const data = await prisma.category.findMany();
    return NextResponse.json({ messages: "Retrieve all categories.", data });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, userId } = await req.json();
    const data = await prisma.category.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    return NextResponse.json({ message: "Created new category", data });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error });
  }
}
