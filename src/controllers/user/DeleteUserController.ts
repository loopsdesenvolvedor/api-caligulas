import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.body;
    console.log(user_id);
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ user_id });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  }
}

export { DeleteUserController };
