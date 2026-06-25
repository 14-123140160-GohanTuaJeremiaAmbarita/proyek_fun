import { useEffect, useRef } from "react";

export function useNetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameId;
    const points = Array.from({ length: 58 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawNode = (x, y, radius, color) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "rgba(255,255,255,0.28)";
      context.stroke();
    };

    const tick = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > 1) point.vx *= -1;
        if (point.y < 0 || point.y > 1) point.vy *= -1;
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 145) {
            context.beginPath();
            context.moveTo(a.x * width, a.y * height);
            context.lineTo(b.x * width, b.y * height);
            context.strokeStyle = `rgba(104, 231, 222, ${1 - distance / 145})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      points.forEach((point, index) => {
        const color = index % 3 === 0 ? "#68e7de" : index % 3 === 1 ? "#ffffff" : "#6aa8ff";
        drawNode(point.x * width, point.y * height, index % 3 === 0 ? 3.4 : 2.4, color);
      });

      frameId = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return canvasRef;
}
