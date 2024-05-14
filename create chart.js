// function to fetch chart data
  async function getChartData() {
  const url = "https://stocks3.onrender.com/api/stocks/getstocksdata";

  const response = await fetch(url);
  const result = await response.json();
  chartData = result.stocksData[0];
  // console.log(chartData["AAPL"]["1mo"]["value"]);
}

// function to create chart

const ctx = document.getElementById("myChart");
let chart = new Chart(ctx, {
  type: "line",
  data: {},
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

 export default async function createChart(stockName = "AAPL", duration = "1mo") {
  await getChartData();

  const label = chartData[stockName][duration]["timeStamp"];
  const updateLabel = label.map((timeStamp) => {
    return new Date(timeStamp * 1000).toLocaleDateString();
  });
  chart.destroy();
  chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: updateLabel,
      datasets: [
        {
          label: "stock price",
          data: chartData[stockName][duration]["value"],
          borderWidth: 2,
          radius: 0,
          borderColor: "blue",
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          beginAtZero: true,
        },
      },
    },
  });
}


// module.exports = {
  
//   createChar:createChart
// };
