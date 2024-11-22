export const formatDate = (timestamp) => {
  if (typeof timestamp !== "number") {
    throw new Error("Invalid timestamp: must be a number.");
  }

  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
