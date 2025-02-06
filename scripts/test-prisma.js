const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.create({
            data: {
                id: "test-user-123",
                email: "test@example.com",
                isActive: false,
            },
        });

        console.log("✅ Utilisateur créé avec succès :", user);
    } catch (error) {
        console.error("❌ Erreur lors de la création de l'utilisateur :", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
