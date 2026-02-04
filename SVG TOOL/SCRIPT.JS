const svg = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");

let drawing = false;
let currentPath;
let paths = [];

function getMousePos(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

svg.addEventListener("mousedown", startDraw);
svg.addEventListener("mousemove", draw);
svg.addEventListener("mouseup", endDraw);
svg.addEventListener("mouseleave", endDraw);

function startDraw(e) {
  drawing = true;
  const pos = getMousePos(e);

  currentPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  currentPath.setAttribute("stroke", colorPicker.value);
  currentPath.setAttribute("stroke-width", "3");
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", `M ${pos.x} ${pos.y}`);

  svg.appendChild(currentPath);
}

function draw(e) {
  if (!drawing) return;

  const pos = getMousePos(e);
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", d + ` L ${pos.x} ${pos.y}`);
}

function endDraw() {
  if (!drawing) return;
  drawing = false;
  paths.push(currentPath);
}

function undo() {
  if (paths.length > 0) {
    const last = paths.pop();
    svg.removeChild(last);
  }
}

function clearCanvas() {
  paths.forEach(p => svg.removeChild(p));
  paths = [];
}
