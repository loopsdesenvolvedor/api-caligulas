import prisma from "../../lib/prisma";
import { Payload } from "../../@types/User";

class DeleteUserService {
  async execute({ user_id }: Payload) {
    if (!user_id) {
      throw new Error("Usuário não informado");
    }

    try {
      const user = await prisma.user.delete({
        where: { id: user_id },
      });

      return {
        user,
      };
    } catch (error) {}
  }
}

export { DeleteUserService };
