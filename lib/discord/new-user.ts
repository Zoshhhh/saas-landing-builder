export async function sendUserToDiscord({
  userId,
  date,
}: {
  userId: string;
  date: Date;
}) {
  const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1336991360175046667/SM0qSsdwHsoH_za8Ee21KSUfO8bYTfk1sBA84jA90I_AKU1Wzl5Ebvb24gbaQs_QaOjF";

  const message = {
    embeds: [
      {
        title: "👤 New User",
        color: 0x0050ff,
        fields: [
          {
            name: "👤 User ID",
            value: userId,
            inline: false,
          },
          {
            name: "🗓️ Date",
            value: date,
            inline: false,
          },
        ],
        footer: {
          text: "🤖 New user from needle.ad",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Discord webhook failed: ${response.status} ${response.statusText} - ${errorText}");
    }

    return true;
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
    throw error;
  }
}
