const langCall = (lang: string, lev : number, object: any) => {
  const callback = (element: boolean)  => element === true;
  const result = object.map((x: {language: string, level: number}) => x.language === lang && x.level == lev)
  return result.some(callback)
 }

 export default langCall