import { Prisma } from "@prisma/client";

export type PostType = {
  title: string;
  body: string;
  image: string;
  video: string;
};
