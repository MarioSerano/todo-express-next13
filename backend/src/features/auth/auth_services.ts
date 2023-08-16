import ResponseError from "~/utils/errors/ResponseError";

export const registerServices = (username: string, password: string) => {
  throw new ResponseError(["encrypt error", "problem in encrypting data"]);
};
