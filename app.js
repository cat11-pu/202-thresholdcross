// app.js：渲染结果
import { accumulate } from "./accumulate.js";
import { countCrossings } from "./cross.js";

export function render(spec) {
  const values = spec.values || [];
  const step = spec.step || 1;
  const view = countCrossings(values, step);
  const cumulative = view.cumulative || [];
  return { cumulative: cumulative, hits: view.hits || [], count: (view.hits || []).length,
           total: view.total || 0, step: step, value_count: values.length,
           checked: cumulative.length === values.length };
}
