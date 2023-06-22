export default function TitleCase(str:string) {
  if (str === "pc") {
    return "PC";
  } else if (str === "playstation") {
    return "PlayStation";
  } else {
    const arr = str.split(' ');
    const titleCase = arr.map(e => e.charAt(0).toUpperCase() + e.slice(1));
    return titleCase.join(' ');
  }
}