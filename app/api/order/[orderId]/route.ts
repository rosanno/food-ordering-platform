import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    await prisma.orderItem.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(
      {
        message: "Order deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
