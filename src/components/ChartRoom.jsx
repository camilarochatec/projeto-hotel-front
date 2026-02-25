import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from "./Card";

ChartJS.register(ArcElement, Tooltip, Legend);


const ChartRoom = () => {

  const data = {
    labels: ['Ocupados', 'Manutenção', 'Reservados', 'Vagos'],
    datasets: [
      {
        label: "Quartos",
        data: [2, 1, 2, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  return (
    <Card
      titulo="Distribuição de Quartos"
    >
      <div className='relative border'>
        <Doughnut data={data} />
        <div className='w-25 h-25 flex flex-col justify-center items-center border absolute text-center bottom-15 z-10 left-1/2 -translate-x-1/2'>
          <h2>10</h2>
          <h6>Total</h6>
        </div>
      </div>
    </Card>
  );
}

export default ChartRoom;