const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let gradientShift = 0;

function drawGradient() {
  gradientShift += 0.5;

  const gradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width * Math.cos(gradientShift * Math.PI / 180),
    canvas.height * Math.sin(gradientShift * Math.PI / 180)
  );

  gradient.addColorStop(0, '#ff9a9e');
  gradient.addColorStop(0.5, '#fad0c4');
  gradient.addColorStop(1, '#fbc2eb');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(drawGradient);
}
drawGradient();
