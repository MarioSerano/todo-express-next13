// MS: Finish dotenv loading first
import express from "express";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..") + "/.env" });

// MS: Import v1 routes after dotenv loaded because of its dependency to db that requires to load environment variables
import errorHandlerMiddleware from "./middleware/error_handler";
import v1Routes from "./routes/v1_routes";

const app = express();

app.use(express.json());
app.use("/v1", v1Routes());

app.use(errorHandlerMiddleware);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${process.env.BACKEND_PORT}`
  )
);
