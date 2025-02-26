import { Prisma } from "@prisma/client";

export type PostType = Omit<
  Omit<Prisma.PostGetPayload<{}>, "createdAt">,
  "updatedAt"
>;
