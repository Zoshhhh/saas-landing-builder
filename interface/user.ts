export interface User {
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    purchase?: UserPurchase;
}

export interface UserPurchase {
    id: string;
    userId: string;
    stripeCustomerId?: string;
    amountPaid: number; // Montant payé
    currency: string; // Devise du paiement (ex: "EUR", "USD")
}
