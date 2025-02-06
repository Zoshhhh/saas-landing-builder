import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// Initialisation de l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion, // ✅ Correction de TypeScript
});

export async function POST(req: NextRequest) {
  try {
    // Chargement de la clé secrète du webhook Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("⚠️ ERREUR : STRIPE_WEBHOOK_SECRET est manquant dans le .env !");
    }

    // Récupération du corps de la requête et de la signature
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("❌ La signature du webhook est absente.");
      return NextResponse.json({ error: "Webhook signature missing" }, { status: 400 });
    }

    // Vérification de l'intégrité du webhook Stripe
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`🚨 Échec de la vérification de la signature du webhook : ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const { data, type: eventType } = event;
    console.log(`✅ Webhook Stripe reçu : ${eventType}`);

    switch (eventType) {
        // 💳 Paiement réussi via Checkout
      case "checkout.session.completed": {
        console.log("🔔 Événement : checkout.session.completed");
        const session = data.object as Stripe.Checkout.Session;

        if (!session.customer) {
          throw new Error("❌ Customer ID manquant dans la session");
        }

        const customerId = session.customer as string;
        console.log(`🔍 Customer ID : ${customerId}`);

        // Récupération des infos du client depuis Stripe
        const customer = await stripe.customers.retrieve(customerId);

        if ("deleted" in customer) {
          throw new Error("❌ Le client a été supprimé");
        }
        if (!customer.email) {
          throw new Error("❌ Aucun email client fourni");
        }

        console.log(`📩 Customer email : ${customer.email}`);

        // Vérification si l'utilisateur existe déjà
        let user = await prisma.user.findUnique({ where: { email: customer.email } });

        if (user && user.isActive) {
          throw new Error("❌ Un abonnement est déjà actif pour cet utilisateur.");
        }

        // Création ou mise à jour de l'utilisateur
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: customer.email,
              stripeCustomerId: customerId,
              subscriptionID: session.subscription as string,
              isActive: true,
            },
          });
          console.log(`✅ Nouvel utilisateur créé : ${JSON.stringify(user)}`);
        } else {
          user = await prisma.user.update({
            where: { email: customer.email },
            data: {
              stripeCustomerId: customerId,
              subscriptionID: session.subscription as string,
              isActive: true,
            },
          });
          console.log(`🔄 Utilisateur mis à jour : ${JSON.stringify(user)}`);
        }
        break;
      }

        // ❌ Paiement échoué
      case "invoice.payment_failed": {
        console.log("⚠️ Paiement échoué détecté !");
        const invoice = data.object as Stripe.Invoice;
        if (!invoice.customer) {
          throw new Error("❌ Customer ID introuvable dans l'événement.");
        }

        const customerId = invoice.customer as string;
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          console.log(`🚨 L'utilisateur ${user.email} a un paiement échoué.`);
          // ➜ Ici, on peut envoyer un email pour demander un nouveau paiement.
        }
        break;
      }

        // 🚫 Abonnement annulé
      case "customer.subscription.deleted": {
        console.log("🔔 Événement : customer.subscription.deleted");
        const subscription = data.object as Stripe.Subscription;

        if (!subscription.customer) {
          throw new Error("❌ Subscription ID introuvable.");
        }

        const customerId = subscription.customer as string;
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error(`⚠️ Utilisateur introuvable pour le client ID : ${customerId}`);
          return NextResponse.json({}, { status: 200 });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            isActive: false,
            subscriptionID: null,
          },
        });

        console.log(`❌ Abonnement annulé pour l'utilisateur : ${user.email}`);
        break;
      }

      default:
        console.warn(`⚠️ Webhook non géré : ${eventType}`);
        return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    console.error(`🔥 Erreur Stripe Webhook : ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}