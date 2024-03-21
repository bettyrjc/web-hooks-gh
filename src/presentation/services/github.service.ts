import { GithubIssueInterface, GithubStarPayload } from "../../interfaces";

export class GithubServices {
  constructor() {}

  onStart(payload: GithubStarPayload) {
    let message: string = `🌟 ${payload.sender.login} ${payload.action} ${payload.repository.full_name}`;
    return message;
  }
  onIssue(payload: GithubIssueInterface) {
    let message: string = `🔔 ${payload.sender.login} ${payload.action} issue ${payload.issue.title}`;
    return message;
  }
}
