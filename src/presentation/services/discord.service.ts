import { envs } from "../../config/envs";

export class DiscordServices {
  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: {
      //       url: "https://giphy.com/gifs/tiktok-bear-tsX3YMWYzDPjAARfeg",
      //     },
      //   },
      // ],
    };
    const response = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Failed to send message to discord");
      return false;
    }
    return true;
  }
}
