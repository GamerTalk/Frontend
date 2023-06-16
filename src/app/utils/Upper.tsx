export default function Upper(str:string) {
  if (str === "pc") {
    return "PC"
  } else if (str === "playstation") {
    return "PlayStation"
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}