// accumulate.js：逐项累加，返回每项之后的累计值
export function accumulate(values) {
  const cumulative = new Array(values.length);
  let sum = 0;
  for (let spot = 0; spot < values.length; spot++) {
    sum += values[spot];
    cumulative[spot] = sum;
  }
  return cumulative;
}
