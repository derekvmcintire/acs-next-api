import CategoryDAO from "@/app/_daos/category";
import databaseClient from "@/app/_database/get-client";
import CategoryService from "@/app/_services/category";
import { CategoryRow } from "@/app/_types/category/types";

const getCategoryService = (): CategoryService => {
  const categoryDao = new CategoryDAO(databaseClient.category);
  return new CategoryService(categoryDao);
};

export async function getCategories(): Promise<CategoryRow[]> {
  try {
    const categoryService = getCategoryService();
    const categories = await categoryService.getCategories();
    return categories;
  } catch (error) {
    throw new Error(String(error));
  }
}
