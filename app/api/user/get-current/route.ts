import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

// URL du webhook Discord (stockée dans une variable d'environnement)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1336991360175046667/SM0qSsdwHsoH_za8Ee21KSUfO8bYTfk1sBA84jA90I_AKU1Wzl5Ebvb24gbaQs_QaOjF";

// Fonction pour envoyer un message au webhook Discord
async function sendDiscordWebhook(message: string) {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });
  } catch (error) {
    console.error("Erreur Webhook Discord :", error);
  }
}

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

    if (!user) {
      // Création du nouvel utilisateur
      user = await prisma.user.create({
        data: { id: userId },
      });

      // Envoie un message sur Discord pour un nouvel utilisateur
      await sendDiscordWebhook(`🚀 **Nouvel utilisateur créé !**\n🔹 ID: \`${userId}\``);
    } else {
      // Envoie un message sur Discord pour une connexion
      await sendDiscordWebhook(`👤 **Utilisateur connecté :** \`${userId}\``);
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erreur API :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
