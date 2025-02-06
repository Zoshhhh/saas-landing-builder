import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Récupération de l'utilisateur via Clerk
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifie si l'utilisateur existe dans la base de données
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Si l'utilisateur n'existe pas, on le crée
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error checking/creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
