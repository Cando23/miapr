const data = {
    labels: x.map((_,i) => i ),
    datasets: [
        
      {
        label: "Data 1",
        borderColor:"yellow",
        data: y1,
      },
      {
        label: "Data 2",
        borderColor:"green",
        data: y2,
      },
    ],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
  
      plugins: {
     
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'bayers'
        }
      }
    },
  };
  const ctx = document.getElementById("chart").getContext("2d");
  const chart = new Chart(ctx, config);