import crypto from "crypto";
import { config } from "dotenv";

config();

export default function () {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const fingerprint = crypto
    .createHmac("sha256", process.env.TOKEN_SECRET!)
    .update(rawToken)
    .digest("hex");

  return { token: rawToken, fingerprint: fingerprint };
}
