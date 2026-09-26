// accumulate.js：逐项累加，返回每项之后的累计值（一次扫描，每值只加一次）
export function accumulate(values) {
  const cumulative = new Array(values.length);
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i];
    cumulative[i] = sum;
  }
  return cumulative;
}
