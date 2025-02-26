import { Prisma } from "@prisma/client";

export type CategoryType = Omit<
  Omit<Prisma.CategoryGetPayload<{}>, "createdAt">,
  "updatedAt"
>;
