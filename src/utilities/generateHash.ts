import { hash } from "crypto";
export default function generateHash(msg: string) {
  return hash("sha256", msg);
}
