import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

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


/**
 * Get user session from cookies (authenticated)
 * 
 */
export async function getSession() {
  const cookiesData = await cookies()
  const jwt = cookiesData.get("jwt")?.value;
  // if(!jwt){
  //   return null;
  // }

  // return validateJwt(jwt);

  return jwt ? validateJwt(jwt) : null;
}

// only for API routes
export async function getApiSession(){
  const headerList = await headers()
  const token = headerList.get("Authorization")?.replace("Bearer ","")
  if(!token){
    return null
  }
  return validateJwt(token)

}