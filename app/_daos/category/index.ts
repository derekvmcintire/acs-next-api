import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { ICategoryDAO } from "@/app/_types/category/database/ICategoryDAO";
import { ICategoryRepository } from "@/app/_types/category/database/ICategoryRepository";

export default class CategoryDAO implements ICategoryDAO {
  constructor(private categoryRepo: ICategoryRepository) {}

  // @TODO: implement createCategory
  // async createCategory(categoryData: CreateCategoryArgs) {
  //   try {
  //     const newCategory = await this.categoryRepo.create({
  //       data: categoryData,
  //     });

  //     return newCategory;
  //   } catch (error) {
  //     throw new Error(getDatabaseQueryErrorMessage(`${(error as Error).message}`));
  //   }
  // }

  async getCategories() {
    try {
      return await this.categoryRepo.findMany();
    } catch (error) {
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
    }
  }
}
