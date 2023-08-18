import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import db from "~/database";
import { users } from "~/database/schema";

export const registerUser = async (
  username: string,
  password: string,
  hashedPassword: string
) => {
  const passwordIsValid = await bcrypt.compare(password, hashedPassword);

  if (!passwordIsValid)
    throw new Error("problem in comparing password and hashed password");

  await db.insert(users).values({
    username,
    password: hashedPassword,
  });
};

export const getUserWithUsername = async (username: string) => {
  const res = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  return res;
};
