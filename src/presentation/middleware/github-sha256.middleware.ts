import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { envs } from "../../config/envs";

const WEBHOOK_SECRET: string = envs.SECRET_TOKEN;
const verify_signature = (req: Request) => {
  try {
    const signatureSha = req.header("x-hub-signature-256") ?? "";
    const signature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    let trusted = Buffer.from(`sha256=${signature}`, "ascii");
    let untrusted = Buffer.from(signatureSha, "ascii");
    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (e) {
    console.error({ error: e });
    return false;
  }
};

export class GithubSha256Middleware {
  static verifySignature(req: Request, res: Response, next: NextFunction) {
    if (!verify_signature(req)) {
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  }
}
