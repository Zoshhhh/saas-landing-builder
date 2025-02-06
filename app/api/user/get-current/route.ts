import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const authData = auth();
    console.log("🔍 Clerk authData:", authData);

    if (!authData || !authData.userId) {
      console.log("❌ Clerk ne renvoie pas d'ID utilisateur !");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = authData;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isActive: true },
    });

    console.log("🔍 Prisma renvoie :", user);

    if (!user) {
      console.log("⚠️ Utilisateur introuvable en BDD !");
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    console.log("✅ Réponse envoyée:", JSON.stringify({ user }));

    return NextResponse.json({ user });
  } catch (error) {
    console.error("🔥 Erreur API :", error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}