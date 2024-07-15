import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { fetchApiCountUserByMonth } from '../../apis';
import { data } from 'autoprefixer';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

  const [dataDetail,setDataDetail] = useState([]);

  useEffect(()=>{
    fetchApiCountUserByMonth(jwt).then(response=>{
        setDataDetail(response.data);
    }).catch(error=>{
      console.log(error);
    })
  },[jwt])

  console.log(dataDetail);

  const data = {
    labels: dataDetail.map(data=> "Tháng " + data.month),
    datasets: [
      {
        label: 'Số người dùng đăng kí theo tháng',
        data: dataDetail.map(data => data.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số người dùng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <Line data={data} options={options} />
  );
};
export default LineChart;
