// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let step = spec.step || 10;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，档位 " + step + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { step: step }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.cumulative.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.hits.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = "累计 " + value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "跨越 " + view.count + " 次，跨越位置 " + JSON.stringify(view.hits);
    parts.log.textContent = "档位 " + step;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "数跨越";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "档位加五";
  moreButton.addEventListener("click", function () {
    step = step + 5;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "档位减五";
  lessButton.addEventListener("click", function () {
    step = Math.max(1, step - 5);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "档位";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(step);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { step = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看跨越次数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { step: step }));
    parts.out.textContent = "跨越 " + view.count + " 次，累计 " + view.total;
  });
  parts.controls.appendChild(readButton);

  draw();
}
