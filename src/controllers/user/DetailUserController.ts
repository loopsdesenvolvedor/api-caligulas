import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.body;
    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute({ user_id });
    res.status(200).json({ user });
  }
}

export { DetailUserController };
