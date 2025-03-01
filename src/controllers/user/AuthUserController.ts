import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }

    const authUserService = new AuthUserService();
    const auth = await authUserService.execute({ email, password });

    res.status(200).json(auth);

    try {
    } catch (error) {
      res
        .status(500)
        .json({
          message: error instanceof Error ? error.message : "Erro interno",
        });
    }
  }
}

export { AuthUserController };
