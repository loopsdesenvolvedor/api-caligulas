import prisma from "../../lib/prisma";
import { Payload } from "../../@types/User";

class DetailUserService {
  async execute({ user_id }: Payload) {
    const user = await prisma.user.findFirst({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

export { DetailUserService };
