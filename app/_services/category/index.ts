import { ICategoryDAO } from "@/app/_types/category/database/ICategoryDAO";
import { CategoryRow } from "@/app/_types/category/types";

export default class CategoryService {
  constructor(private categoryDao: ICategoryDAO) {}

  async getCategories(): Promise<CategoryRow[]> {
    try {
      const rows: CategoryRow[] = await this.categoryDao.getCategories();
      return rows;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
