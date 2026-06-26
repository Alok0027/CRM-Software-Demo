import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler, RadialLinearScale } from 'chart.js';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler, FunnelController, TrapezoidElement, RadialLinearScale);

const quarterlySalesData = {
  labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
  revenue: [45000, 52000, 61000, 75000, 82000],
};

const salesFunnelData = {
  labels: ['Prospects', 'Qualified Leads', 'Proposals', 'Negotiations', 'Deals Won'],
  values: [5000, 3500, 2000, 1200, 800],
};

const leadSourceData = {
  labels: ['Organic Search', 'Referrals', 'Paid Ads', 'Social Media'],
  revenue: [150000, 125000, 95000, 60000],
};

const dealStageData = {
  labels: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'],
  values: [120, 85, 60, 40, 25],
};

const taskCompletionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  completed: [150, 180, 220, 190, 210, 240],
  pending: [50, 40, 30, 35, 25, 20],
};

const teamActivityData = {
  labels: ['Alice', 'Bob', 'Charlie', 'Diana'],
  calls: [120, 95, 150, 110],
  emails: [300, 250, 320, 280],
  meetings: [40, 55, 35, 50],
};

// --- CHART CONFIGURATIONS ---



// 2. Sales Funnel (Funnel Chart)
const salesFunnelChart = {
  data: {
    labels: salesFunnelData.labels,
    datasets: [{
      label: 'Deals',
      data: salesFunnelData.values,
      backgroundColor: ['#FFB84C', '#FFA559', '#FF8C42', '#FF7F3F', '#FF6F3C'],
    }],
  },
  options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } },
};

// 3. Lead Source ROI (Doughnut Chart)
const leadSourceChart = {
  data: {
    labels: leadSourceData.labels,
    datasets: [{
      label: 'Revenue by Source',
      data: leadSourceData.revenue,
      backgroundColor: ['#FFB84C', '#FFA559', '#FF8C42', '#FF7F3F'],
      borderColor: '#ffffff',
      borderWidth: 2,
    }],
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } },
};

// 4. Team Activity Leaderboard (Horizontal Bar Chart)
const teamActivityChart = {
  data: {
    labels: teamActivityData.labels,
    datasets: [
      { label: 'Calls', data: teamActivityData.calls, backgroundColor: 'rgba(255, 184, 76, 0.8)' },
      { label: 'Emails', data: teamActivityData.emails, backgroundColor: 'rgba(255, 140, 66, 0.8)' },
      { label: 'Meetings', data: teamActivityData.meetings, backgroundColor: 'rgba(255, 127, 63, 0.8)' },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { display: false } } }, plugins: { legend: { position: 'bottom' } } },
};

// 5. Deal Stage Distribution (Doughnut Chart)
const dealStageChart = {
  data: {
    labels: dealStageData.labels,
    datasets: [{
      data: dealStageData.values,
      backgroundColor: ['#FFB84C', '#FFA559', '#FF8C42', '#FF7F3F', '#FF6F3C'],
    }],
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } }, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } },
};

// 6. Monthly Task Completion (Radar Chart)
const taskCompletionChart = {
  data: {
    labels: taskCompletionData.labels,
    datasets: [
      { label: 'Completed', data: taskCompletionData.completed, backgroundColor: 'rgba(255, 184, 76, 0.3)', borderColor: '#FF7F3F', borderWidth: 1 },
      { label: 'Pending', data: taskCompletionData.pending, backgroundColor: 'rgba(255, 184, 76, 0.3)', borderColor: '#FF7F3F', borderWidth: 1 },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false, scales: { r: { pointLabels: { font: { size: 14 } } } } },
};

// --- Reusable Chart Card Component ---
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80">
    <h3 className="text-lg font-normal text-gray-700 mb-4">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

const salesPerformanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid: { display: false }, ticks: { callback: (value) => `$${value / 1000}k` } },
    x: { grid: { display: false } },
  },
};

const AnalyticsDashboard = () => {
  const chartRef = useRef(null);
  const [salesChartData, setSalesChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(255,127,63,0.7)');
      gradient.addColorStop(1, 'rgba(255,184,76,0.05)');

      setSalesChartData({
        labels: quarterlySalesData.labels,
        datasets: [{
          label: 'Quarterly Revenue',
          data: quarterlySalesData.revenue,
          fill: true,
          backgroundColor: gradient,
          borderColor: '#FF7F3F',
          pointBackgroundColor: '#FFB84C',
          tension: 0.4,
        }],
      });
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-medium text-gray-800 mb-2">Sales Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">An overview of your company's sales performance and activities.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Quarterly Sales Performance">
          <Line ref={chartRef} data={salesChartData} options={salesPerformanceOptions} />
        </ChartCard>
        <ChartCard title="Sales Funnel">
          <Bar type="funnel" data={salesFunnelChart.data} options={salesFunnelChart.options} />
        </ChartCard>
        <ChartCard title="Lead Source ROI (Revenue)">
          <Doughnut data={leadSourceChart.data} options={leadSourceChart.options} />
        </ChartCard>
        <ChartCard title="Team Activity Leaderboard">
          <Bar data={teamActivityChart.data} options={teamActivityChart.options} />
        </ChartCard>
        <ChartCard title="Deal Stage Distribution">
          <Doughnut data={dealStageChart.data} options={dealStageChart.options} />
        </ChartCard>
        <ChartCard title="Monthly Task Completion">
          <Radar data={taskCompletionChart.data} options={taskCompletionChart.options} />
        </ChartCard>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
