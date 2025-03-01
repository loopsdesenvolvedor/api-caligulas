import prisma from "../../lib/prisma";
import { compare } from "bcryptjs";

import { AuthType } from "../../@types/User";
import { sign } from "jsonwebtoken";

class AuthUserService {
  async execute({ email, password }: AuthType) {
    try {
      if (!email) {
        throw new Error("Email/password inválido");
      }

      const user = await prisma.user.findFirst({ where: { email: email } });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordIsMatcher = await compare(password, user.password);

      if (!passwordIsMatcher) {
        throw new Error("Email/password inválido");
      }

      const token = sign(
        {
          name: user.email,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
          subject: user.id,
          expiresIn: "1d",
        }
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export { AuthUserService };
