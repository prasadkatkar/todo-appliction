import jwt from "jsonwebtoken";

export function validateJwt(token: string) {
  try {
    const decoded = jwt.verify(token, "SecretKey") as {
      id: number;
      email: string;
    };
    return decoded;
  } catch {
    return null;
  }
}
