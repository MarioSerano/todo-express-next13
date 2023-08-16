import { Router } from "express";

import authRoutes from "../features/auth/auth_routes";

const v1Routes = () => {
  const router = Router();

  // add more routes
  authRoutes(router);

  return router;
};

export default v1Routes;
