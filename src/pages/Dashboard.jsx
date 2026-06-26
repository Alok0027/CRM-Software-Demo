import React, { useRef, useEffect, useState } from "react";
import {
  Line,
  Bar,
  Pie
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const trafficChartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (trafficChartRef.current) {
      const ctx = trafficChartRef.current.ctx;
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 150);
      gradientFill.addColorStop(0, "#f97316");
      gradientFill.addColorStop(1, "#ffffff");
      setGradient(gradientFill);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-3 sm:px-4 lg:px-6 py-4 text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">Earnings</p>
          <h3 className="text-xl font-normal">$350.4</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">Spend this month</p>
          <h3 className="text-xl font-normal">$642.39</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">Sales</p>
          <h3 className="text-xl font-medium text-orange-500">$574.34</h3>
          <p className="text-xs text-green-500">+23% since last month</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">Your balance</p>
          <h3 className="text-xl font-medium">$1,000</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">New Tasks</p>
          <h3 className="text-xl font-medium">154</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Projects</p>
          <h3 className="text-xl font-medium">2935</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

        <div className="lg:col-span-1 xl:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow h-80">
          <div className="h-full">
            <div className="flex justify-between items-center h-full gap-4">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-md font-medium mb-1">This Month</p>
                  <h3 className="text-2xl font-medium">₹37.5K</h3>
                  <p className="text-xs text-orange-500">+2.45% • On track</p>
                </div>
              </div>
              <div className="flex-1 h-full">
                <Line
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                      {
                        label: 'Revenue',
                        data: [12000, 15000, 14000, 18000, 17500, 20000],
                        borderColor: '#FB923C',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        fill: false,
                      },
                      {
                        label: 'Projection',
                        data: [11000, 14500, 13500, 17000, 16000, 19500],
                        borderColor: '#F97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false,
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        display: true,
                        grid: { display: false },
                        ticks: {
                          color: '#9CA3AF',
                          font: { size: 12 }
                        }
                      },
                      y: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-2 bg-white p-6 rounded-xl shadow h-80">
          <p className="text-md font-medium mb-2 text-orange-500">
            Weekly Revenue
          </p>
          <div className="mt-4 h-44">
            <Bar
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    label: 'Revenue - Tier 1',
                    data: [500, 600, 700, 800, 900, 800, 850],
                    backgroundColor: '#FED7AA',
                    barPercentage: 0.3,
                    categoryPercentage: 0.5,
                    borderRadius: 8,
                  },
                  {
                    label: 'Revenue - Tier 2',
                    data: [300, 400, 450, 500, 600, 550, 580],
                    backgroundColor: '#FB923C',
                    barPercentage: 0.3,
                    categoryPercentage: 0.5,
                    borderRadius: 8,
                  },
                  {
                    label: 'Revenue - Tier 3',
                    data: [100, 200, 250, 300, 350, 300, 320],
                    backgroundColor: '#EA580C',
                    barPercentage: 0.3,
                    categoryPercentage: 0.5,
                    borderRadius: 8,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                      color: '#9CA3AF',
                      font: { size: 12 }
                    }
                  },
                  y: {
                    stacked: true,
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Row 2: Complex Table & Check Table */}
        <div className="lg:col-span-2 xl:col-span-2 bg-white p-4 rounded-xl shadow">
          <h4 className="text-md font-medium mb-4">Complex Table</h4>
          <table className="w-full text-sm rounded-lg">
            <thead className="text-left text-gray-500 rounded-lg">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Horizon UI PRO", "Approved", "18 Apr 2021"],
                ["Horizon UI Free", "Disable", "18 Apr 2021"],
                ["Marketplace", "Error", "20 May 2021"],
                ["Weekly Update", "Approved", "12 May 2021"],
              ].map(([name, status, date], idx) => {
                return (
                  <tr key={idx} className="hover:bg-gray-50 text-sm text-gray-700">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">
                      <span className="flex items-center gap-2">
                        <span className={`w-5 h-5 flex items-center justify-center text-xs font-medium text-white rounded-full ${status === "Approved" ? "bg-orange-500" : status === "Disable" ? "bg-red-500" : "bg-yellow-400"}`}>
                          {status === "Approved" && "✔"}
                          {status === "Disable" && "✖"}
                          {status === "Error" && "!"}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-orange-400 h-2 rounded-full"
                          style={{ width: `${(idx + 1) * 20}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-2 xl:col-span-2 bg-white p-4 rounded-xl shadow">
          <h4 className="text-md font-medium mb-4">Check Table</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm rounded-lg">
              <thead className="text-left text-gray-500 rounded-lg">
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Progress</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Horizon UI PRO", "17.5%", "2,458", "24 Jan 2021"],
                  ["Horizon UI Free", "10.8%", "1,485", "12 Jun 2021"],
                  ["Weekly Update", "21.3%", "1,024", "5 Jan 2021"],
                  ["Venus 3D Asset", "31.5%", "858", "7 Mar 2021"],
                  ["Marketplace", "12.2%", "258", "17 Dec 2021"],
                ].map(([name, prog, qty, date], idx) => (
                  <tr key={name} className="hover:bg-gray-50 text-sm text-gray-700">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="accent-orange-500 checked:text-white text-white" defaultChecked={idx < 3} />
                    </td>
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        {prog}
                      </span>
                    </td>
                    <td className="px-4 py-2">{qty}</td>
                    <td className="px-4 py-2">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 3: Calendar, Daily Traffic, Pie Chart, Tasks */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white p-4 rounded-xl shadow">
          <h4 className="text-md font-medium mb-4">April 2021</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600">
            {["M", "T", "W", "T", "F", "S", "S", ...Array(30).fill(0).map((_, i) => i + 1)].map((d, idx) => (
              <div
                key={idx}
                className={`p-1 rounded-full ${[27, 28, 29, 30].includes(d) ? "bg-orange-300 text-white" : ""}`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-1 bg-white p-4 rounded-xl shadow">
          <p className="text-md font-medium">Daily Traffic</p>
          <h3 className="text-2xl font-medium">2,579</h3>
          <p className="text-xs text-green-500">+2.45%</p>
          <div className="mt-4 h-36">
            <Bar
              ref={trafficChartRef}
              data={{
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                  label: 'Traffic',
                  data: [400, 800, 600, 900, 750, 1050, 620],
                  backgroundColor: gradient,
                  borderRadius: 6,
                  barPercentage: 0.4,
                  categoryPercentage: 0.6,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    display: false,
                    grid: {
                      display: false,
                      drawBorder: false
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false
                    },
                    ticks: {
                      color: '#9CA3AF',
                      font: { size: 12 }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-1 bg-white p-4 rounded-xl shadow">
          <p className="text-md font-medium mb-4">Your Pie Chart</p>
          <div className="w-full h-48 flex items-center justify-center">
            <div className="w-40 h-40">
              <Pie
                data={{
                  labels: ['Your Files', 'System'],
                  datasets: [{
                    data: [63, 25],
                    backgroundColor: ['#FB923C', '#E5E7EB'],
                    borderColor: '#fff',
                    borderWidth: 2,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#6B7280',
                        boxWidth: 12,
                        padding: 8,
                        font: {
                          size: 11
                        }
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span>Your files 63%</span>
            <span>System 25%</span>
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-1 bg-white p-4 rounded-xl shadow">
          <h4 className="text-md font-medium mb-4">Tasks</h4>
          <ul className="text-sm">
            {[
              ["Dashboard Builder", true],
              ["Mobile App Design", true],
              ["Illustrations", false],
              ["Promotional LP", false],
            ].map(([task, done], i) => (
              <li key={i} className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="accent-orange-500 checked:text-white text-white" checked={done} readOnly />
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;