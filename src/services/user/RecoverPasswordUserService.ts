import prisma from "../../lib/prisma";
import { createTransport } from "nodemailer";
import { RecoverPasswordType } from "../../@types/User";
import { sign } from "jsonwebtoken";

class RecoverPasswordUserService {
  async execute({ email }: RecoverPasswordType) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const transport = createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperação de senha",
        text: `Para recuperar sua senha, acesse o link: http://localhost:3333/api/reset-password/${token}`,
      };

      await transport.sendMail(mailOptions);

      return {
        message: "Link de redefinição de senha enviado para o seu e-mail",
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export { RecoverPasswordUserService };
