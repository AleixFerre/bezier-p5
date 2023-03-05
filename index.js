const points = [];
const noiseXs = Array.from({ length: 4 }, () => Math.random() * 1000);
const noiseYs = Array.from({ length: 4 }, () => Math.random() * 1000);
const noiseIntensity = 500;
const noiseVelocity = 100;
let noiseOffset = 0;

function setup() {
  createCanvas(600, 600);
  generatePoints();
}

function draw() {
  background(220);

  const noisedPoints = points.map((p, i) => ({
    x: p.x + noise(noiseXs[i] + noiseOffset) * noiseIntensity - noiseIntensity / 2,
    y: p.y + noise(noiseYs[i] + noiseOffset) * noiseIntensity - noiseIntensity / 2,
  }));

  noisedPoints.forEach((p) => {
    stroke("purple");
    strokeWeight(10);
    point(p.x, p.y);
  });

  for (let i = 0; i < 1; i += 0.01) {
    stroke("orange");
    strokeWeight(2);
    const d1 = lerpVector(noisedPoints[0], noisedPoints[1], i);
    const d2 = lerpVector(noisedPoints[1], noisedPoints[2], i);
    const d3 = lerpVector(noisedPoints[2], noisedPoints[3], i);

    point(d1.x, d1.y);
    point(d2.x, d2.y);
    point(d3.x, d3.y);

    const d4 = lerpVector(d1, d2, i);
    const d5 = lerpVector(d2, d3, i);

    point(d4.x, d4.y);
    point(d5.x, d5.y);

    const d6 = lerpVector(d4, d5, i);

    stroke("red");
    strokeWeight(2);
    point(d6.x, d6.y);
  }

  noiseOffset += 1 / noiseVelocity;
}

function generatePoints() {
  points.push({ x: 150, y: 350 });
  points.push({ x: 200, y: 150 });
  points.push({ x: 400, y: 150 });
  points.push({ x: 450, y: 350 });
}

function lerpVector(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  };
}
