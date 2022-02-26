const canvas = document.querySelector("#jsCanvas");
const colors = document.querySelectorAll("#jsColor div");
const rangeBar = document.querySelector("#jsRange");
const $currentValue = document.querySelector("#currentValue");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const vacate = document.querySelector("#jsVacate");
let painting = false;
let filling = false;
const ctx = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 650;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 650, 650); // 기본 배경 하얀색으로 설정
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;
function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleChangeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}
function handleBrushSize(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  $currentValue.innerText = size;
}
function fillMode() {
  if (filling === true) {
    filling = false;
    mode.textContent = "Fill";
  } else {
    filling = true;
    mode.textContent = "Paint";
  }
}
function handleClickWithFillMode() {
  if (filling === true) {
    ctx.fillRect(5, 5, 650, 650);
  }
}
function saveImg() {
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = data;
  link.download = "Image";
  link.click();
}
function vacatePaint() {
  ctx.clearRect(0, 0, 650, 650);
}
for (i = 0; colors.length > i; i++) {
  colors[i].addEventListener("click", handleChangeColor);
} // 색깔 바꾸기
rangeBar.addEventListener("input", handleBrushSize); // 사이즈 바꾸기
canvas.addEventListener("mousemove", onMouseMove); // 마우스 좌표 따라가기 및 선 그리기
canvas.addEventListener("mousedown", startPainting); // 마우스 눌렀을 때 페인팅 시작
canvas.addEventListener("mouseup", stopPainting); // 마우스 뗐을 때 페인팅 멈춤
canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖으로 마우스가 나갔을 때 페인팅 멈춤
canvas.addEventListener("click", handleClickWithFillMode);
mode.addEventListener("click", fillMode); // fill & paint 전환
save.addEventListener("click", saveImg); // 이미지 저장
vacate.addEventListener("click", vacatePaint); // 페인트 비우기
