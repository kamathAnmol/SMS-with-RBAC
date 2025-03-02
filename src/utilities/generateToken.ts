import crypto from "crypto";

export default function () {
  return crypto.randomBytes(32).toString("hex");
}
