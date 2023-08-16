import { Router } from "express";

const authRoutes = (router: Router) => {
  const authRouter = Router();
  router.use("/todo", authRouter);

  authRouter.get("/", (_, res) => {
    // TODO: Query params validation
    // TODO: Get result from services
    // TODO: Send response back
    res.send("hello");
  });

  authRouter.post("/", (_, res) => {
    // TODO: Query params validation
    // TODO: Get result from services
    // TODO: Send response back
    res.send("hello");
  });

  authRouter.patch("/:id", (_, res) => {
    // TODO: Query params validation
    // TODO: Get result from services
    // TODO: Send response back
    res.send("hello");
  });

  authRouter.delete("/:id", (_, res) => {
    // TODO: Query params validation
    // TODO: Get result from services
    // TODO: Send response back
    res.send("hello");
  });
};

export default authRoutes;
