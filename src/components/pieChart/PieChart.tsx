import React, { useEffect, useRef } from "react";
import { ICurrencyExchange, statType } from "../../store/interfaces";
import { useSumAndTypeToSum } from "../../store/defaultValues";
import "./PieChart.scss";

const PieChart: React.FC<{
  type: statType;
  width: number;
  currencyList: ICurrencyExchange[];
}> = ({ type, width, currencyList }) => {
  const { sum, typeToSum } = useSumAndTypeToSum(type, currencyList);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawPieChart = (ctx: CanvasRenderingContext2D) => {
    const types = typeToSum.keys();
    let startAngle: number = 0;
    for (let type of types) {
      const angleRaw: number = typeToSum.get(type) || 0;
      const angle = (angleRaw / sum) * Math.PI * 2;
      ctx.fillStyle = type.color;
      ctx.beginPath();
      ctx.arc(width / 2, width / 2, width / 2, startAngle, startAngle + angle);
      ctx.lineTo(width / 2, width / 2);
      ctx.fill();
      startAngle += angle;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = width;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawPieChart(ctx);
  }, [type]);

  return (
    <div className="pie-chart">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PieChart;
