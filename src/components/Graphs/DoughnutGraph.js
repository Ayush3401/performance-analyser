import { Chart, registerables } from 'chart.js';
import { useEffect } from "react";
import { processChart } from './utility'
Chart.register(...registerables);

function DoughnutGraph({ data, title }) {
  useEffect(() => {
    const cfg = processChart(data, title, 'doughnut');
    const canvas = document.getElementById('mychart' + title);
    canvas.style.border = "1px solid black";
    const chart = new Chart(canvas.getContext('2d'), cfg);
    return () => chart.destroy();
  }, [data, title]);
  return (
    <>
      <canvas id={"mychart" + title} width={"500"} height={"500"}></canvas>
    </>)
}

export default DoughnutGraph;