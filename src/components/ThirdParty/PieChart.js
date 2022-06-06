import { Chart, registerables } from 'chart.js';
import { useEffect } from "react";

Chart.register(...registerables);

function round(value) {
  return Math.round(value * 100) / 100;
}




function generateRandomBackgroundColors() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ",0.75)";
  return bgColor;
}

function minify(label) {
  const MAX_LENGTH = 40;
  if (label.length > MAX_LENGTH) {
    return label.substring(0, 15) + "..." + label.slice(-10);
  }
  return label;
}


function processChart(data, title) {
  const length = data.length;
  const bgColor = []
  for (var i = 0; i < length; i++) {
    bgColor.push(generateRandomBackgroundColors());
  }
  const labels = data.map(item => item.url);
  const values = data.map(item => round(item.data));
  const datasets = [
    {
      label: title,
      backgroundColor: bgColor,
      data: values,
      borderWidth: 1
    }
  ]

  data = {
    type: 'pie',
    data: {
      labels,
      datasets,
      hoverOffset: 4
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: minify(chart.data.labels[i]) + `${data}`,
              fillStyle: datasets[0].backgroundColor[i],
            }))
          }
        }
      }
    }
  }
  return data;

}



function PieChart({ data, title }) {
  useEffect(() => {
    const cfg = processChart(data, title);
    const canvas = document.getElementById('mychart' + title);
    const chart = new Chart(canvas.getContext('2d'), cfg);
    return () => chart.destroy();
  }, [data, title]);
  return (
    <>
      <h1>{title}</h1>
      <canvas id={"mychart" + title} width={"500"} height={"500"}></canvas>
    </>)
}

export default PieChart;