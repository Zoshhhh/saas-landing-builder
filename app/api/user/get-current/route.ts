import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs";
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

    // Fetch the current user from Clerk to get the email
    const clerkUser = await currentUser();
    if (!clerkUser || !clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
      console.error("❌ Impossible de récupérer l'email de l'utilisateur depuis Clerk");
      return NextResponse.json({ error: "Unable to retrieve user email" }, { status: 500 });
    }

    const email = clerkUser.emailAddresses[0].emailAddress;

    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isActive: true, stripeCustomerId: true, subscriptionID: true },
    });

    console.log("🔍 Prisma renvoie :", user);

    if (!user) {
      console.log("⚠️ Utilisateur introuvable en BDD, création en cours...");
      
      user = await prisma.user.create({
        data: { 
          id: userId,
          email: email,
          isActive: false, // Set to false by default, will be updated when subscription is active
        },
      });

      console.log("✅ Nouvel utilisateur créé:", user);
    }

    console.log("✅ Réponse envoyée:", JSON.stringify({ user }));

    return NextResponse.json({ user });
  } catch (error) {
    console.error("🔥 Erreur API :", error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}