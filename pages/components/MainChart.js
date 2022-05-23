import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function MainChart({ 
  keyword, 
  all_datalab, 
  mobile_datalab, 
  // pc_datalab, 
  all_device_total_count,
  mobile_total_count,
  // pc_total_count
}) {

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {

  responsive: true,

  plugins: {

    legend: {
      position: 'top',
      // display: false
    },

    title: {
      display: true,
      text: `${keyword} 검색 트렌드`,
    },

  }, 

  scales: {
    
    y: {
        display: true // Hide Y axis labels
    },
    
    x: {
        display: false // Hide X axis labels
    }
}   
};

const labels = all_datalab?.map((num) => { return num?.period } );
const all_device_relative_counts = all_datalab?.map((num) => { return num?.ratio } );
const all_device_sum_of_relative_counts = all_device_relative_counts?.reduce(function(a, b) { return a + b; }, 0);
const all_device_absolute_counts = all_device_relative_counts?.map((num) => { return Math.round(num * all_device_total_count / all_device_sum_of_relative_counts) });

const mobile_relative_counts = mobile_datalab?.map((num) => { return num?.ratio } ) || []; // new Array(len).fill(labels?.length)
const mobile_sum_of_relative_counts = mobile_relative_counts && mobile_relative_counts?.reduce(function(a, b) { return a + b; }, 0);
const mobile_absolute_counts = mobile_sum_of_relative_counts && mobile_relative_counts?.map((num) => { return Math.round(num * mobile_total_count / mobile_sum_of_relative_counts) });

// const pc_relative_counts = pc_datalab?.map((num) => { return num?.ratio } );
// const pc_sum_of_relative_counts = pc_relative_counts?.reduce(function(a, b) { return a + b; }, 0);
const pc_absolute_counts = all_device_absolute_counts && mobile_absolute_counts && all_device_absolute_counts?.map(function(item, idx) { return item - mobile_absolute_counts[idx] });// pc_relative_counts?.map((num) => { return Math.round(num * pc_total_count / pc_sum_of_relative_counts) });

const data = {
  
  labels,
  datasets: [
    {
      label: "Total 검색량",
      data: all_device_absolute_counts,
      borderColor: "rgb(15, 216, 103)",
      backgroundColor: "rgba(15, 216, 103, 0.5)",
    },
    {
        label: "Mobile 검색량",
        data: mobile_absolute_counts,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    {
      label: "PC 검색량",
      data: pc_absolute_counts,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <main className="lg:col-span-12">
          <div className="mt-4">
            <Line options={options} data={data} />
          </div>
        </main>
      </div>
    </div>
)

};