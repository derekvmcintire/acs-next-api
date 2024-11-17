import { ICategoryDAO } from "@/app/_types/category/database/ICategoryDAO";
import { ICategoryRepository } from "@/app/_types/category/database/ICategoryRepository";

export default class CategoryDAO implements ICategoryDAO {
  constructor(private categoryRepo: ICategoryRepository) {}

  async getCategories() {
    return await this.categoryRepo.findMany();
  }
}
