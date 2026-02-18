"use client";

export default function SparkAnimation() {
  return (
    <>
      <style>{`
        @keyframes spark-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
          }
        }

        .spark {
          animation: spark-burst 0.6s ease-out forwards;
          pointer-events: none;
        }

        @keyframes pulse-merge {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .pill-merge {
          animation: pulse-merge 0.8s ease-out forwards;
        }
      `}</style>

      {/* Spark particles container */}
      <div
        id="spark-container"
        className="fixed inset-0 pointer-events-none z-40"
      />
    </>
  );
}

export function createSparkEffect(
  x: number,
  y: number,
  count: number = 8
): void {
  const container = document.getElementById("spark-container");
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "spark fixed w-2 h-2 bg-yellow-400 rounded-full";

    const angle = (i / count) * Math.PI * 2;
    const distance = 40 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    container.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
  }
}
