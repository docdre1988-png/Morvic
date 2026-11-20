export const palette = [
  ['Blanco','#ffffff'],['Crema','#e7d9bd'],['Avena','#c4ae91'],['Beige','#d1b992'],
  ['Miel','#caa364'],['Amarillo','#edca55'],['Naranja','#e08a42'],['Terracota','#b47761'],
  ['Rojo','#c85050'],['Rosa','#d8ada5'],['Fucsia','#c74c8d'],['Lila','#b6a0cb'],
  ['Morado','#80629c'],['Celeste','#93bdd5'],['Azul','#4476ab'],['Marino','#283c58'],
  ['Salvia','#91a38d'],['Verde','#4c855c'],['Marrón','#805c45'],['Gris','#969b9a'],['Negro','#262b2b'],
] as const;
export const colorHex = (name: string) => palette.find(([label]) => label === name)?.[1] ?? '#d4d6ce';
