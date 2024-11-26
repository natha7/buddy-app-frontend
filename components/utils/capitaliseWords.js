export default function capitaliseWords(str) {
  return str
    .split(" ")
    .map((word) => {
      if (word.startsWith("(")) {
        return "(" + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
      }

      return word
        .split("'")
        .map((segment, idx, segments) => {
          if (segments.length === 2 && idx === 1 && segment.toLowerCase() === "s") {
            return segment.toLowerCase();
          }
          return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
        })
        .join("'");
    })
    .join(" ");
}
