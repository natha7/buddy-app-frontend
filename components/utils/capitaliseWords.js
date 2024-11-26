export default function capitaliseWords(str) {
  return str
    .split(" ")
    .map((word) =>
      word
        .split("'")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
        .join("'")
    )
    .join(" ");
}
