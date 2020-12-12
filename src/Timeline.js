import React from 'react';
import Chart from "react-apexcharts";

const Timeline = (props) => {

  const carsCopy = JSON.parse(JSON.stringify(props.cars));
  carsCopy.sort((a, b) => (a.startDate - b.startDate));

  const options = {
    title: {
      text: 'My Car History',
      align: 'center',
      style: {
        fontSize: '18px',
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return '';
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: true,
      maxWidth: '200px',
      labels: {
        style: {
          fontSize: '16px',
        }
      }
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
      }
    }
  };

  const data = carsCopy.map(car => {
    return {
      x: `${car.year} ${car.make} ${car.model}`,
      y: [
        car.startDate,
        car.endDate
      ],
      fillColor: '#008FFB'
    }
  });

  const series = [
    {
      data
    }
  ];


  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="rangeBar"
        width={900}
      />
    </div>
  )

}

export default Timeline;