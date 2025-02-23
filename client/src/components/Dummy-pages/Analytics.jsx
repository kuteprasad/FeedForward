import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Analytics() {
  // Fake data for NGOs and Donors
  const ngoData = {
    totalNGOs: 150,
    activeNGOs: 120,
    donors: 450,
    donatedAmount: 35000,
    newDonorsToday: 25,
  };

  // Chart Data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Donations Over Time',
        data: [5000, 7000, 8000, 9000, 9500, 11000, 12500], // Fake donation values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="analytics-container" style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>NGO & Donor Analytics</h1>

      <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div className="stat-box" style={statBoxStyle}>
          <h2>Total NGOs</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngoData.totalNGOs}</p>
        </div>
        <div className="stat-box" style={statBoxStyle}>
          <h2>Active NGOs</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngoData.activeNGOs}</p>
        </div>
        <div className="stat-box" style={statBoxStyle}>
          <h2>Total Donors</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngoData.donors}</p>
        </div>
      </div>

      <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div className="stat-box" style={statBoxStyle}>
          <h2>Donated Amount</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${ngoData.donatedAmount.toLocaleString()}</p>
        </div>
        <div className="stat-box" style={statBoxStyle}>
          <h2>New Donors Today</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngoData.newDonorsToday}</p>
        </div>
      </div>

      <div className="chart-container" style={{ width: '80%', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Donation Trends Over Time</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

// Style for the stat boxes
const statBoxStyle = {
  backgroundColor: '#f4f4f9',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '30%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Donation Statistics',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
};
