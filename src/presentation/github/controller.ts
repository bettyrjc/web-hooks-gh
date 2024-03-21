import { Request, Response } from "express";
import { GithubServices } from "../services/github.service";
import { DiscordServices } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubServices = new GithubServices(),
    private readonly discordServices = new DiscordServices()
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    // const signature = req.header("x-hub-signature-256") ?? "unknown";
    const payload = req.body;
    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubServices.onStart(payload);
        break;
      case "issues":
        message = this.githubServices.onIssue(payload);
        break;
      default:
        message = "unknown event";
        break;
    }
    this.discordServices
      .notify(message)
      .then(() => res.status(202).send("accepted"))
      .catch(() => res.status(500).json({ error: "failed" }));
  };
}
