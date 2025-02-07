import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1337396962487439422/rM2m6JCxBDL5pftQGD4Ax8i3G6Ag9fFqxFyurBGCZDcL2szLQIQKfKglREJc73mCuzGq";

async function sendDiscordNotification(content: string): Promise<void> {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de la notification Discord:", error);
  }
}

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

      // Envoi d'une notification Discord pour un nouvel utilisateur
      await sendDiscordNotification(`🎉 New User: **${email}**`);
    } else {
      // Envoi d'une notification Discord quand un utilisateur se connecte à la dashboard
      await sendDiscordNotification(`✅ User Logged In: **${email}**`);
    }

    console.log("✅ Réponse envoyée:", JSON.stringify({ user }));
    return NextResponse.json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("🔥 Erreur API :", error);
      return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
