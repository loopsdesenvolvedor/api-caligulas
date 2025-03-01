import { Request, Response } from "express";
import { RecoverPasswordUserService } from "../../services/user/RecoverPasswordUserService";

class RecoverPasswordUserController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const recoverPasswordUserService = new RecoverPasswordUserService();
      const user = await recoverPasswordUserService.execute({ email });

      res.status(200).json({
        message:
          "Se o e-mail estiver cadastrado na nossa base de dados você reberá isntruções para redefinir sua senha.",
      });
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "Erro ao recuperar senha",
      });
    }
  }
}

export { RecoverPasswordUserController };
