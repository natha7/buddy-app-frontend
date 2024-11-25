const formatDate = (isoString) => {
  const date = new Date(isoString); // Parse the ISO string into a Date object

  // Extract the day, month, and year
  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Format as dd-mm-yyyy
  return `${year}-${month}-${day}`;
};

export default formatDate;
