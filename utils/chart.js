import * as echarts from '../ec-canvas/echarts';

const createChart = function (canvas, width, height, dpr) {
  return echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  })
}

export function initChart(data) {
  return function (canvas, width, height, dpr) {
    const chart = createChart(canvas, width, height, dpr);

    canvas.setChart(chart);
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} {d}%'
      },
      legend: {
        left: 'center',
        itemHeight: 6 * dpr,
        itemWidth: 6 * dpr,
        icon: "circle",
        z: 2,
      },
      series: [{
        type: 'pie',
        z: 5,
        top: '25%',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        label: {
          color: '#ffffff',
          show: true,
          position: 'inner', //标签的位置
          textStyle: {
            fontSize: 5 * dpr //文字的字体大小
          },
          formatter: '{d}%'
        },
        labelLine: {
          show: false
        },
        data
      }]
    };

    chart.setOption(option);
    return chart;
  }
}