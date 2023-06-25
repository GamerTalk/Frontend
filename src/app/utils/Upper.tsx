export default function Upper(str:string) {
  if (str === "pc") {
    return "PC"
  } else if (str === "playstation") {
    return "PlayStation"
  } else if (str === "mmo") {
    return "MMO"
  } else if (str === "rpg") {
    return "RPG"
  } {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}