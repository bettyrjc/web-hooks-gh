import express from "express";
import { envs } from "./config/envs";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middleware/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();
  app.use(express.json());
  app.use(GithubSha256Middleware.verifySignature);
  app.post("/api/github", controller.webhookHandler);
  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
