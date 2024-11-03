import { CategoryRow } from "../types";

export interface ICategoryDAO {
  getCategories(): Promise<CategoryRow[]>;
}
