export default function TitleCase(str:string) {
  if (str === "pc") {
    return "PC";
  } else if (str === "playstation") {
    return "PlayStation";
  } else if (str === "mmo") {
    return "MMO"
  } else if (str ==="RPG") {
    return "RPG"
  } {
    const arr = str.split(' ');
    const titleCase = arr.map(e => e.charAt(0).toUpperCase() + e.slice(1));
    return titleCase.join(' ');
  }
}