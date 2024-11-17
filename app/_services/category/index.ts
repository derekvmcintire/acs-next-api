import { ICategoryDAO } from "@/app/_types/category/database/ICategoryDAO";
import { CategoryRow } from "@/app/_types/category/types";

export default class CategoryService {
  constructor(private categoryDao: ICategoryDAO) {}

  async getCategories(): Promise<CategoryRow[]> {
    return this.categoryDao.getCategories();
  }
}
