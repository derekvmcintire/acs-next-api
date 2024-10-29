export const getInternalServerErrorMessage = (error: string) =>
  `Internal Server Error: ${error}`;
export const getDatabaseQueryErrorMessage = (error: string) =>
  `Database query error: ${error}`;
export const getRiderNotFoundErrorMessage = (id: string) =>
  `Rider with id ${id} not found`;
export const getResultsNotFoundErrorMessage = (riderId: string) =>
  `Results for rider id ${riderId} not found`;