import prisma from "../../lib/prisma";
import { verify } from "jsonwebtoken";
import { hash } from "bcryptjs";

import {
  ResetPasswordType,
  TokenPayload,
  MessagePromisseType,
} from "../../@types/User";

class ResetPasswordUserService {
  async execute({
    token,
    newPassword,
  }: ResetPasswordType): Promise<MessagePromisseType> {
    try {
      const decoded = verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;

      if (!decoded || !decoded.id) {
        throw new Error("Token inválido ou expirado");
      }

      const user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const hashPassword = await hash(newPassword, 8);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashPassword },
      });

      return { message: "Senha redefinida com sucesso." };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export { ResetPasswordUserService };
