import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../@types/User";

export const isAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) {
      throw new Error("Token não fornecido");
    }
    const [, token] = authToken.split(" ");

    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    req.user_id = sub;
    next();
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Não autorizado",
    });
    return;
  }
};
