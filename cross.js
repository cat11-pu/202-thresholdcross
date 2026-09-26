// cross.js：数跨越，单次扫描，用累计值整除档位的差值累加
export function countCrossings(values, step) {
  if (!(step >= 1)) {
    const error = new Error("step must be >= 1");
    error.code = "E_BAD_STEP";
    throw error;
  }
  const cumulative = new Array(values.length);
  const hits = [];
  let sum = 0;
  let crossed = 0;
  for (let spot = 0; spot < values.length; spot++) {
    const value = values[spot];
    if (value < 0) {
      const error = new Error("values must be non-negative");
      error.code = "E_BAD_STEP";
      throw error;
    }
    sum += value;
    cumulative[spot] = sum;
    const reached = Math.floor(sum / step);
    if (reached > crossed) {
      hits.push(spot);
      crossed = reached;
    }
  }
  return { cumulative: cumulative, hits: hits, total: crossed };
}
