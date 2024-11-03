export interface BaseCategory {
  disicpline: string;
  description?: string | null;
}

export interface CategoryRow extends BaseCategory {
  id: number;
  name: string;
}
