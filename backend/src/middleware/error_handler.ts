import { ErrorRequestHandler } from "express";

import ResponseError, { isResponseError } from "~/utils/errors/ResponseError";

const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  _,
  res,
  next
) => {
  if (!isResponseError(err))
    throw new ResponseError([
      "internal server error",
      "problem on the server side",
    ]);
  res.status(err.status ?? 500);
  res.json({ errors: err.messages[0], errors_description: err.messages[1] });
  next();
};

export default errorHandlerMiddleware;
