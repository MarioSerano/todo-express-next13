import { RequestHandler, Router } from "express";
import expressAsyncHandler from "express-async-handler";

import ResponseError, { isResponseError } from "~/utils/errors/ResponseError";
import successResponse from "~/utils/response/success_response";

import { registerServices, loginServices } from "./auth_services";

const authRoutes = (router: Router) => {
  const authRouter = Router();
  router.use("/auth", authRouter);

  authRouter.post("/register", expressAsyncHandler(registerHandler));

  authRouter.post("/login", expressAsyncHandler(loginHandler));
};

const registerHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    throw new ResponseError(
      ["invalid request", "username and password field not filled"],
      400
    );
  }

  if (!(typeof username === "string" && typeof password === "string")) {
    throw new ResponseError(
      ["invalid request", "both username and password has to be typed string"],
      400
    );
  }

  try {
    await registerServices(username, password);
  } catch (e) {
    if (isResponseError(e as Error)) throw e;
    throw new ResponseError([
      "internal server error",
      "problem on the server side",
    ]);
  }

  res.status(201).json(successResponse("successfully registered user!"));
};

const loginHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    throw new ResponseError(["invalid request", "username field not filled"]);
  }
  try {
    await loginServices(username, password);
  } catch (e) {
    if (isResponseError(e as Error)) throw e;
    throw new ResponseError([
      "internal server error",
      "problem on the server side",
    ]);
  }
};

export default authRoutes;
