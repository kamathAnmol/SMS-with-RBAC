import Tokens from "@models/sessions.model";

export default function checkExpiry(token: Tokens) {
  const now = new Date();
  const expiry = new Date(token.expiresOn);
  return expiry > now;
}
