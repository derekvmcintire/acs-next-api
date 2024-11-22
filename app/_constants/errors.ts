export const getInternalServerErrorMessage = (error: string) =>
  `Internal Server ${error}`;
export const getDatabaseQueryErrorMessage = (error: string) =>
  `Database query failed: ${error}`;
export const getRiderNotFoundErrorMessage = (id: string) =>
  `Rider with id ${id} not found`;
export const getResultsNotFoundErrorMessage = (riderId: string) =>
  `Results for rider id ${riderId} not found`;
export const CREATE_RESULT_INVALID_REQUEST =
  "Missing required fields: Please include eventId, riderId, and resultTypeId.";

