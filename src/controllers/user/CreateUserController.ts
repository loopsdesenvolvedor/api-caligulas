import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      if (!req.file) {
        throw new Error("Favor enviar uma imagem de avatar");
      } else {
        const avatar = req.file.filename;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
          name,
          email,
          password,
          avatar,
        });

        res.status(201).json({ user });
      }
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ error: error.message || "Erro ao criar usuario" });
      } else {
        res.status(500).json({ error: "Erro desconhecido ao criar o usuário" });
      }
    }
  }
}

export { CreateUserController };
