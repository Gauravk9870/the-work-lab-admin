import React from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const UserRegistrationChart = ({ freelancerData, organizationData }) => {
  React.useEffect(() => {
    // Cleanup previous chart instance
    return () => {
      const chartInstance = Chart.getChart("userRegistrationChart");
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: freelancerData.months,
    datasets: [
      {
        label: "Freelancers",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: freelancerData.counts,
      },
      {
        label: "Organizations",
        backgroundColor: "#fef7e5",
        borderColor: "#fca311",
        borderWidth: 1,
        hoverBackgroundColor: "#fef7e5",
        hoverBorderColor: "#fca311",
        data: organizationData.counts,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          // display: false, // Hide x-axis grid lines
          color: "whitesmoke",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          // display: false, // Hide x-axis grid lines
          color: "whitesmoke",
        },
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};

export default UserRegistrationChart;
