export function randomElements<T>(arr: T[], quantity: number): T[] {
  const result = new Array(quantity);
  let len = arr.length;
  const taken = new Array(len);
  console.log(quantity, len);
  if (quantity > len) return arr;
  while (quantity--) {
    const x = Math.floor(Math.random() * len);
    result[quantity] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
