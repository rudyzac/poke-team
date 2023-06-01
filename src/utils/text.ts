export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatList(list: string[]): string[] {
  return list.map((value, index) =>
    index === list.length - 1 ? `${value}. ` : `${value}, `
  );
}
