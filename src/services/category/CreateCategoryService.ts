import prisma from "../../lib/prisma";
import { CategoryType } from "../../@types/Category";
import slugify from "slugify";

class CreateCategoryService {
  async execute({ name }: CategoryType) {
    const categoryExists = await prisma.category.findFirst({
      where: { name: name },
    });

    try {
      if (categoryExists) {
        throw new Error("Slug e categoria já cadastrado na base de dados");
      }
      const category = await prisma.category.create({
        data: {
          name,
          slug: slugify(name.toLowerCase()),
        },
      });

      return category;
    } catch (error) {}
  }
}

export { CreateCategoryService };
