export default function TitleCase(str:string) {
  if (str === "pc") {
    return "PC";
  } else if (str === "playstation") {
    return "PlayStation";
  } else {
    console.log(str);
    const arr = str.split(' ');
    const titleCase = arr.map(e => e.charAt(0).toUpperCase() + e.slice(1));
    console.log(titleCase)
    return titleCase.join(' ');
    
  }
}