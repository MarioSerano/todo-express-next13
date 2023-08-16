import { RequestHandler, Router } from "express";
import ResponseError, { isResponseError } from "~/utils/errors/ResponseError";
import { registerServices } from "./auth_services";

const authRoutes = (router: Router) => {
  const authRouter = Router();
  router.use("/auth", authRouter);

  authRouter.post("/register", registerHandler);

  authRouter.post("/login", (_, res) => {
    // TODO: Query params validation
    // TODO: Get result from services
    // TODO: Send response back
    res.send("hello");
  });
};

const registerHandler: RequestHandler = (req, res) => {
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
    registerServices(username, password);
  } catch (e: unknown) {
    if (isResponseError(e as Error)) throw e;
    throw new ResponseError([
      "internal server error",
      "problem on the server side",
    ]);
  }

  res.send("hello register");
};

export default authRoutes;
