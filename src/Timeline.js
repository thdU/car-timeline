import React from 'react';
import Chart from "react-apexcharts";
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInYears from 'date-fns/differenceInYears'
import './Timeline.scss';

const Timeline = (props) => {

  const carsCopy = JSON.parse(JSON.stringify(props.cars));
  carsCopy.sort((a, b) => (a.startDate - b.startDate));

  const getChartEndtime = () => {
    let chartEndtime;

    for (const car of carsCopy) {
      if (!chartEndtime || car.endDate > chartEndtime) {
        chartEndtime = car.endDate;
      }
    }

    if (!chartEndtime) {
      chartEndtime = new Date().getTime();
    }

    return chartEndtime;
  }

  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: '<img src="./download_icon.png" class="ico-download" width="30">',
        },
      }
    },
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
      enabled: false,
      // formatter: function (val, opts) {
      //   // var label = opts.w.globals.labels[opts.dataPointIndex]
      //   if (val.length === 2 && val[1] > val[0]) {
      //     const years = differenceInYears(val[1], val[0]);
      //     const months = differenceInMonths(val[1], val[0]);

      //     if (years === 0) {
      //       return `${months} m`;
      //     } else if (months % 12 === 0) {
      //       return `${years} yr`;
      //     }

      //     return `${years} yr, ${months - 12 * years} m`;
      //   }

      //   return '';
      // },
    },
    xaxis: {
      type: 'datetime',
      max: getChartEndtime(),
      labels: {
        style: {
          fontSize: '14px',
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        align: 'center',
        maxWidth: '200px',
        style: {
          fontSize: '16px',
        },
      },
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
      }
    },
    tooltip: {
      enabled: false,
    }
  };

  const data = carsCopy.map(car => {
    return {
      x: [`${car.year} ${car.make} ${car.model}`, `${car.desc}`],
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
    <div className='chartWrapper'>
      <Chart
        options={options}
        series={series}
        type="rangeBar"
        width={'100%'}
      />
    </div>
  )

}

export default Timeline;