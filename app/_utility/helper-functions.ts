export const getYearFromDateString = (dateString: string): number => {
  // Attempt to parse common date formats
  const isoDateMatch = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  const isoDateTimeMatch = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/; // ISO DateTime format

  let date;

  // Parse as UTC if matches common formats
  if (isoDateMatch.test(dateString)) {
    date = new Date(`${dateString}T00:00:00Z`);
  } else if (isoDateTimeMatch.test(dateString)) {
    date = new Date(dateString.endsWith("Z") ? dateString : `${dateString}Z`);
  } else {
    // Attempt natural language parsing
    date = new Date(dateString);
  }

  // Check if the date object is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  return date.getUTCFullYear(); // Use UTC to avoid timezone issues
};
