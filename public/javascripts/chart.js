
$(()=>{


  var data = {
    lable: "Fav shape",
    lables: ["Circle", "Square", "Triangle"],
    data: [34, 56, 12]
  };

  $("#chartBtn").click(()=>{
    chart(data);
  });
});


function chart(data){

  colors = randomColors(data.data.length);

  console.log(colors);
  var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: data.lables,
        datasets: [{
            label: data.lable,
            data: data.data,
            backgroundColor: colors.colors,
            borderColor: colors.borderColors,
            borderWidth: 1
        }]
    },
    options: {
      responsive: false,
      cutoutPercentage: 50
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero:true
        //         }
        //     }]
        // }
    }
});

}


function randomColors(numOfColors){
  var colors = [];
  var borderColors = [];
  for (var i = 0; i < numOfColors; i++) {
    var r = random255();
    var g = random255();
    var b = random255();

    colors.push("rgba(" + r + ","  + g + "," + b + ",0.5)");
    borderColors.push("rgba(" + r + ","  + g + "," + b + ",1)");
  }

  return{
    colors: colors,
    borderColors: borderColors
  };
}

function random255(){
  return Math.floor(Math.random() * (255 - 100)) + 100;
  //return Math.floor(Math.random() * (max - min)) + min;
}
