export function capitalizeName(name) {
  if (typeof name !== "string") return;
  const splitName = name.split(" ");

  const capitalizedName = splitName.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });

  return capitalizedName;
}
