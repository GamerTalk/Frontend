export default function TitleCase(str:string) {
  const arr = str.split(' ');
  arr.map(e => e.charAt(0).toUpperCase() + e.slice(1));
  return arr.join(' ');
}