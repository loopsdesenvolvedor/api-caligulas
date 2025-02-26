import prisma from "../../lib/prisma";
import { hash } from "bcryptjs";

import { UserType } from "../../@types/User";

class CreateUserService {
  async execute({ name, email, password, avatar }: UserType) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrando na base de dados");
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: avatar || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
