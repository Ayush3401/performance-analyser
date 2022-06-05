import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);

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


function processChart(data, title) {
  const length = data.length;
  const bgColor = []
  for (var i = 0; i < length; i++) {
    bgColor.push(generateRandomBackgroundColors());
  }
  const labels = data.map(item => item.url);
  const values = data.map(item => round(item.data));
  const customLabels = labels.map((label, index) => `${label}: ${round(values[index])}`)
  console.log(customLabels);
  const datasets = [
    {
      label: title,
      backgroundColor: bgColor,
      data: values,
      borderWidth: 1
    }
  ]

  data = {
    customLabels,
    datasets
  }
  return data;

}



function PieChart({ data, title }) {
  const chartData = processChart(data, title);
  const options = {
    legend: {
      display: true,
      position: "top"
    },
    plugins: {
      datalabels: {
        color: 'black',
        labels: {
          title: {
            font: {
              weight: 'bold',
              padding: "20px"
            },
          },
          value: {
            color: 'green'
          }
        }
      }
    }
  }
  return (
    <>
      <h1>{title}</h1>
      <Pie height={"400px"} width={"400px"} data={chartData} plugins={[ChartDataLabels, Legend]} options={options} />
    </>)
}

export default PieChart;