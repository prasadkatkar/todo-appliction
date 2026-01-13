import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import z from "zod";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();

  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return new Response(
      JSON.stringify({
        error: validation.error.message,
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }
  const data = validation.data;
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.email, data.email), eq(users.password, data.password)));
  if (result.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Account Does not Exist",
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }
  // generate JWT and send to users.
  const user = result[0];
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    "SecretKey",
    {
      expiresIn: "15 min",
    }
  );

  return new Response(
    JSON.stringify({
      token: token,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}
