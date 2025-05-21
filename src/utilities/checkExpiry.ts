import Sessions from "@models/sessions.model";

export default function checkExpiry(createdAt: string, expiryDuration: string) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const expirySeconds = parseInt(expiryDuration, 10);
  const expiry = new Date(createdDate.getTime() + expirySeconds * 1000);
  return expiry > now;
}
