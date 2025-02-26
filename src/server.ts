import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "uploads")));

app.use("/api", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    stack: err.stack,
  });
  return;
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
