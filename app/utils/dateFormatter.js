const formatDate = (isoString, type) => {
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  if (type === "journal") return `${day}-${month}-${year}`;
  return `${year}-${month}-${day}`;
};

export default formatDate;
