import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiUsers } from 'react-icons/fi';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Tooltip as ReTooltip
} from 'recharts';

const opportunityStages = [
  { name: 'Lead In', value: 100 },
  { name: 'Qualified', value: 80 },
  { name: 'Proposal Sent', value: 60 },
  { name: 'Negotiation', value: 40 },
  { name: 'Closed Won', value: 20 },
];

// Orange theme palette
const pieColors = ['#FFB84C', '#FFA559', '#FF8C42', '#FF7F3F', '#FF6F3C'];
const barColors = ['#FFB84C', '#FFA559', '#FF8C42', '#FF7F3F', '#FF6F3C']; // for bar chart stages
const monthlyConversionRates = [
  { month: 'Jan', rate: 18 },
  { month: 'Feb', rate: 22 },
  { month: 'Mar', rate: 27 },
  { month: 'Apr', rate: 30 },
  { month: 'May', rate: 25 },
];

const opportunityDistribution = [
  { stage: 'Lead In', deals: 100 },
  { stage: 'Qualified', deals: 80 },
  { stage: 'Proposal', deals: 60 },
  { stage: 'Negotiation', deals: 40 },
  { stage: 'Won', deals: 20 },
];

const Opportunity = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium text-gray-800">Deals</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow">
          <FiPlus /> New Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { title: 'Total', value: '145' },
          { title: 'Open Deals', value: '87' },
          { title: 'Won Deals', value: '35' },
          { title: 'Lost Deals', value: '23' },
          { title: 'Conversion Rate', value: '24.1%' },
          { title: 'Avg. Closing Time', value: '12d' },
        ].map((card, idx) => (
          <div key={idx} className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center shadow">
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-xl font-medium text-orange-600">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-medium text-gray-800 mb-3">Pipeline View</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Lead In', 'Contacted', 'Proposal Sent', 'Negotiation', 'Closed - Won', 'Closed - Lost'].map(stage => (
            <div key={stage} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <h3 className="text-orange-700 font-medium mb-2 text-sm">{stage}</h3>
              <div className="space-y-2 text-sm text-gray-800">
                <div className="bg-white p-2 rounded border border-orange-200 shadow-sm">
                  <p className="font-medium">Deal #{Math.floor(Math.random() * 1000)}</p>
                  <p className="text-xs text-gray-500">Client: Acme Inc.</p>
                  <p className="text-xs text-gray-500">₹50,000</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute top-2.5 left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-md bg-white text-gray-800"
            />
          </div>
          <button className="flex items-center gap-1 text-sm text-orange-500">
            <FiFilter /> Filter
          </button>
        </div>
        <p className="text-sm text-gray-500">Showing 1–10 of 145</p>
      </div>

      <div className="overflow-auto rounded-lg border border-orange-100 bg-white shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-orange-100 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Value (₹)</th>
              <th className="px-4 py-3">Probability (%)</th>
              <th className="px-4 py-3">Expected Close</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-orange-100 hover:bg-orange-50">
                <td className="px-4 py-3 font-medium text-gray-800">Opportunity #{i + 1}</td>
                <td className="px-4 py-3 text-gray-700">Client Name</td>
                <td className="px-4 py-3 text-gray-700">Proposal Sent</td>
                <td className="px-4 py-3 text-gray-700">₹75,000</td>
                <td className="px-4 py-3 text-gray-700">60%</td>
                <td className="px-4 py-3 text-gray-700">20 Jul 2025</td>
                <td className="px-4 py-3 text-gray-700">Alok Mishra</td>
                <td className="px-4 py-3 text-orange-600">High Value</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-orange-500 text-white">
                    Open
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-medium text-gray-800 mb-3">Visual Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stage Distribution Pie Chart */}
          <div className="h-64 rounded-lg flex flex-col items-center justify-center p-4 shadow">
            <PieChart width={280} height={220}>
              <Pie
                data={opportunityStages}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {opportunityStages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              {/* Removed <ReTooltip /> */}
            </PieChart>
            <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4 justify-center">
              {opportunityStages.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Conversion Line Chart */}
          <div className="h-64 rounded-lg flex flex-col items-center justify-center p-4 shadow">
            <LineChart width={320} height={220} data={monthlyConversionRates}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="month" />
              <YAxis />
              {/* Removed <ReTooltip /> */}
              <defs>
                <linearGradient id="lineOrangeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFB84C"/>
                  <stop offset="100%" stopColor="#FF7F3F"/>
                </linearGradient>
              </defs>
              <Line type="monotone" dataKey="rate" stroke="url(#lineOrangeGradient)" strokeWidth={3} dot={{ r: 6, fill: '#FFA559', stroke: '#FF7F3F', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#FF8C42', stroke: '#FF6F3C', strokeWidth: 2 }} />
            </LineChart>
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF7F3F]"></div>
              <span>Conversion Rate (%)</span>
            </div>
          </div>

          {/* Opportunity Distribution Bar Chart */}
          <div className="h-64 rounded-lg flex flex-col items-center justify-center p-4 shadow">
            <BarChart width={320} height={220} data={opportunityDistribution}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="stage" />
              <YAxis />
              {/* Removed <ReTooltip /> */}
              {opportunityDistribution.map((entry, idx) => (
                <Bar key={entry.stage} dataKey="deals" fill={barColors[idx % barColors.length]} radius={[8, 8, 0, 0]} />
              ))}
            </BarChart>
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#845EC2]"></div>
              <span>Deals</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Create New Opportunity</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Opportunity Name" className="w-full border p-2 rounded-md" />
              <input type="text" placeholder="Client Name" className="w-full border p-2 rounded-md" />
              <input type="text" placeholder="Value" className="w-full border p-2 rounded-md" />
              <input type="text" placeholder="Owner" className="w-full border p-2 rounded-md" />
              <textarea placeholder="Notes" className="w-full border p-2 rounded-md"></textarea>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded bg-gray-200">Cancel</button>
              <button className="px-4 py-2 text-sm rounded bg-orange-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunity;