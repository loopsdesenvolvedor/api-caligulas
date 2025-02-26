import { Prisma } from "@prisma/client";

export type UserType = Omit<
  Omit<Omit<Prisma.UserGetPayload<{}>, "id">, "createdAt">,
  "updatedAt"
>;
