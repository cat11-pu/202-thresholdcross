// cross.js：数跨越（单趟扫描；运行累计与整除商值差值同步推进，不重扫历史）
function badStep(message) {
  const error = new Error(message);
  error.code = "E_BAD_STEP";
  return error;
}

export function countCrossings(values, step) {
  if (typeof step !== "number" || !Number.isFinite(step) || step < 1) {
    throw badStep("档位必须是不小于 1 的数");
  }

  const cumulative = new Array(values.length);
  const hits = [];
  let total = 0;
  let sum = 0;
  let prevQuotient = 0;
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      throw badStep("数值不能为负");
    }
    sum += value;
    cumulative[i] = sum;
    const quotient = Math.floor(sum / step);
    const crossed = quotient - prevQuotient;
    if (crossed > 0) {
      total += crossed;
      hits.push(i);
    }
    prevQuotient = quotient;
  }
  return { cumulative: cumulative, hits: hits, total: total };
}
