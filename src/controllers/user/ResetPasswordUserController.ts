import { Request, Response } from "express";
import { ResetPasswordUserService } from "../../services/user/ResetPasswordUserService";

class ResetPasswordUserController {
  async handle(req: Request, res: Response) {
    const { token } = req.params;
    const { newPassword } = req.body;

    console.log(token);
    const resetPasswordUserService = new ResetPasswordUserService();
    try {
      const result = await resetPasswordUserService.execute({
        token,
        newPassword,
      });

      if (result.message) {
        res.status(200).json({ message: result.message });
      }

      if (result.error) {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Erro ao resetar senha",
      });
    }
  }
}

export { ResetPasswordUserController };
