const formatDate = (isoString) => {
  const date = parseISO(isoString);
  return format(date, "yyyy-MM-dd");
};

modules.export = { formatDate };
