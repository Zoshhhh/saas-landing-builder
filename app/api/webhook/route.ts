import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// Initialisation de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

export async function POST(req: NextRequest) {
  try {
    // Vérifier que la clé webhook est bien définie
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("⚠️ ERREUR : STRIPE_WEBHOOK_SECRET est manquant dans le .env !");
    }

    // Lire le corps et récupérer la signature
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "❌ Signature Stripe absente." }, { status: 400 });
    }

    // Vérifier la validité du webhook Stripe
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`🚨 Échec vérification webhook : ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const { type, data } = event;
    console.log(`✅ Webhook Stripe reçu : ${type}`);

    switch (type) {
      case "checkout.session.completed": {
        console.log("🔔 Paiement réussi via Checkout");
        const session = data.object as Stripe.Checkout.Session;

        // Récupérer l'email et l'ID du client
        const customerId = session.customer as string | null;
        const customerEmail = session.customer_email || session.customer_details?.email || null;

        if (!customerEmail) {
          console.error("❌ Impossible de récupérer l'email du client.");
          return NextResponse.json({ error: "Aucun email trouvé." }, { status: 400 });
        }

        console.log(`📩 Email client : ${customerEmail}`);
        console.log(`🔍 Customer ID : ${customerId || "N/A"}`);

        let user = await prisma.user.findUnique({ where: { email: customerEmail } });

        if (!user) {
          console.log("🆕 Création d'un nouvel utilisateur.");
          user = await prisma.user.create({
            data: {
              email: customerEmail,
              stripeCustomerId: customerId || null,
              isActive: true,
            },
          });
        } else {
          console.log("🔄 Mise à jour de l'utilisateur existant.");
          await prisma.user.update({
            where: { email: customerEmail },
            data: { stripeCustomerId: customerId || null, isActive: true },
          });
        }

        return NextResponse.json({ success: true });
      }

      case "customer.subscription.deleted": {
        console.log("🔔 Abonnement annulé");
        const subscription = data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { isActive: false, subscriptionID: null },
          });
          console.log(`❌ Accès retiré pour ${user.email}`);
        }
        return NextResponse.json({ success: true });
      }

      case "invoice.payment_failed": {
        console.log("⚠️ Paiement échoué détecté !");
        const invoice = data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          console.warn(`⚠️ Paiement échoué pour ${user.email}`);
        }
        return NextResponse.json({ success: true });
      }

      default:
        console.warn(`⚠️ Webhook non géré : ${type}`);
        return NextResponse.json({}, { status: 200 });
    }
  } catch (error: any) {
    console.error(`🔥 Erreur Webhook : ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}