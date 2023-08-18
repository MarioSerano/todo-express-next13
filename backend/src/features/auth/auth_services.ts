import bcrypt from "bcrypt";

import { registerUser, getUserWithUsername } from "./auth_repositories";
import ResponseError from "~/utils/errors/ResponseError";

export const registerServices = async (username: string, password: string) => {
  // TODO: separate salt rounds as constants so we can just parse it once and that is when the server starts
  const saltRoundsString = process.env.BCRYPT_SALT_ROUNDS;

  if (typeof saltRoundsString !== "string")
    throw new Error("environment variable BCRYPT_SALT_ROUNDS not defined");

  const saltRounds = parseInt(saltRoundsString);

  if (isNaN(saltRounds))
    throw new Error("BRCYPT_SALT_ROUNDS has to be an integer value");

  username = username.toLowerCase();

  const res = (await getUserWithUsername(username))[0];
  if (typeof res !== "undefined")
    throw new ResponseError(
      ["invalid request", `user with username ${username} already exists!`],
      400
    );

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (e) {
    throw new Error("problem in hashing password");
  }

  await registerUser(username, password, hashedPassword);
};

export const loginServices = async (username: string, password: string) => {
  const saltRoundsString = process.env.BCRYPT_SALT_ROUNDS;

  username = username.toLowerCase();
  const res = (await getUserWithUsername(username))[0];

  if (typeof res === "undefined")
    throw new ResponseError(
      ["invalid request", `user with username ${username} not found!`],
      400
    );
  if (typeof saltRoundsString !== "string")
    throw new Error("environment variable BCRYPT_SALT_ROUNDS not defined");

  const saltRounds = parseInt(saltRoundsString);

  if (isNaN(saltRounds))
    throw new Error("BRCYPT_SALT_ROUNDS has to be an integer value");

  let passwordIsValid;
  try {
    passwordIsValid = await bcrypt.compare(password, res.password);
  } catch (e) {
    throw new Error("problem in comparing password hash");
  }

  if (!passwordIsValid)
    throw new ResponseError([
      "invalid request",
      "incorrect password from username",
    ]);

  return {
    access_token: "",
  };
};
