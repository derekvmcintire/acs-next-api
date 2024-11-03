import { CategoryRow } from "../types";

export interface ICategoryRepository {
  findMany(): Promise<CategoryRow[]>;
}
