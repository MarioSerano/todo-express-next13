import express, { ErrorRequestHandler } from "express";
import * as dotenv from "dotenv";
import path from "path";

import v1Routes from "./routes/v1_routes";
import errorHandlerMiddleware from "./middleware/error_handler";

dotenv.config({ path: path.resolve(__dirname, "..") + "/.env" });

const app = express();

app.use(express.json());
app.use("/v1", v1Routes());

app.use(errorHandlerMiddleware);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${process.env.BACKEND_PORT}`
  )
);
