import { ErrorRequestHandler } from "express";

import ResponseError, { isResponseError } from "~/utils/errors/ResponseError";

const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  _,
  res,
  next
) => {
  if (!isResponseError(err))
    throw new Error("error object need to be instance of response error");
  res.status(err.status ?? 500);
  res.json({ errors: err.messages[0], errors_description: err.messages[1] });
  next();
};

export default errorHandlerMiddleware;
