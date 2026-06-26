import React, { useState } from 'react';
import { FiPlus, FiFilter, FiDownload, FiPlay, FiPause, FiEdit3, FiTrash2, FiEye, FiCopy, FiShare2, FiRefreshCw, FiGrid, FiList, FiBarChart2, FiUsers, FiCalendar, FiTag } from 'react-icons/fi';

const DataSets = () => {
  const [viewMode, setViewMode] = useState('table');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [refreshingDataSets, setRefreshingDataSets] = useState(new Set());

  const dataSets = [
    {
      id: 1,
      name: 'High-Value Leads',
      description: 'Contacts with lead score > 80 and recent activity',
      entity: 'Contacts',
      recordCount: 234,
      filters: ['Lead Score > 80', 'Last Activity < 7 days', 'Status = Qualified'],
      type: 'live',
      lastUpdated: '2 minutes ago',
      createdBy: 'John Doe',
      tags: ['sales', 'priority'],
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      name: 'Churned Clients',
      description: 'Customers who haven\'t engaged in 90+ days',
      entity: 'Contacts',
      recordCount: 89,
      filters: ['Status = Customer', 'Last Activity > 90 days', 'Deal Stage = Closed Won'],
      type: 'live',
      lastUpdated: '15 minutes ago',
      createdBy: 'Jane Smith',
      tags: ['retention', 'risk'],
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 3,
      name: 'Demo Requests (Last 30 days)',
      description: 'Recent demo requests for follow-up',
      entity: 'Deals',
      recordCount: 67,
      filters: ['Created Date > 30 days ago', 'Stage = Demo Scheduled', 'Source = Website'],
      type: 'static',
      lastUpdated: '1 day ago',
      createdBy: 'Mike Johnson',
      tags: ['demos', 'marketing'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 4,
      name: 'Enterprise Prospects',
      description: 'Large companies with high deal values',
      entity: 'Companies',
      recordCount: 45,
      filters: ['Company Size > 1000', 'Industry = Technology', 'Deal Value > $50k'],
      type: 'live',
      lastUpdated: '1 hour ago',
      createdBy: 'Sarah Wilson',
      tags: ['enterprise', 'high-value'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      name: 'Q4 Closed Deals',
      description: 'All deals closed in Q4 2024',
      entity: 'Deals',
      recordCount: 156,
      filters: ['Close Date >= Oct 1, 2024', 'Close Date <= Dec 31, 2024', 'Stage = Closed Won'],
      type: 'static',
      lastUpdated: '3 days ago',
      createdBy: 'Tom Brown',
      tags: ['quarterly', 'reporting'],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const availableFilters = [
    { category: 'Contact Fields', filters: ['First Name', 'Last Name', 'Email', 'Phone', 'Lead Score', 'Status'] },
    { category: 'Company Fields', filters: ['Company Name', 'Industry', 'Size', 'Revenue', 'Location'] },
    { category: 'Deal Fields', filters: ['Deal Name', 'Value', 'Stage', 'Close Date', 'Probability'] },
    { category: 'Activity', filters: ['Last Activity', 'Email Opens', 'Email Clicks', 'Website Visits'] },
    { category: 'Dates', filters: ['Created Date', 'Modified Date', 'Last Contact Date'] }
  ];

  const handleViewDetails = (dataSet) => {
    setSelectedDataSet(dataSet);
    setShowDetailsModal(true);
  };

  const handleEditDataSet = (dataSet) => {
    alert(`Editing dataset: ${dataSet.name}`);
  };

  const handleExportDataSet = (dataSet) => {
    alert(`Exporting dataset: ${dataSet.name}`);
  };

  const handleDuplicateDataSet = (dataSet) => {
    alert(`Duplicating dataset: ${dataSet.name}`);
  };

  const handleShareDataSet = (dataSet) => {
    alert(`Sharing dataset: ${dataSet.name}`);
  };

  const handleRefreshDataSet = async (dataSetId) => {
    setRefreshingDataSets(prev => new Set([...prev, dataSetId]));
    // Simulate refresh process
    setTimeout(() => {
      setRefreshingDataSets(prev => {
        const newSet = new Set(prev);
        newSet.delete(dataSetId);
        return newSet;
      });
      alert('Dataset refreshed successfully!');
    }, 2000);
  };

  const handleCreateDataSet = () => {
    alert('Dataset created successfully!');
    setShowCreateModal(false);
  };

  const DataSetCard = ({ dataSet }) => (
    <div className={`bg-white rounded-lg shadow-md border border-orange-100 p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${dataSet.color} flex items-center justify-center`}>
            <FiBarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-normal text-gray-800 flex items-center gap-2">
              {dataSet.name}
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                dataSet.type === 'live' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {dataSet.type === 'live' ? 'Live' : 'Static'}
              </span>
            </h3>
            <p className="text-sm text-gray-600">{dataSet.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleEditDataSet(dataSet)}
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="Edit"
          >
            <FiEdit3 className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={() => handleViewDetails(dataSet)}
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="View Details"
          >
            <FiEye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Entity</p>
          <p className="text-sm font-medium text-gray-800">{dataSet.entity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Records</p>
          <p className="text-sm font-medium text-gray-800">{dataSet.recordCount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Active Filters</p>
        <div className="flex flex-wrap gap-1">
          {dataSet.filters.slice(0, 2).map((filter, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {filter}
            </span>
          ))}
          {dataSet.filters.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              +{dataSet.filters.length - 2} more
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Tags</p>
        <div className="flex flex-wrap gap-1">
          {dataSet.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <p>Updated: {dataSet.lastUpdated}</p>
          <p>By: {dataSet.createdBy}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExportDataSet(dataSet)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" 
            title="Export"
          >
            <FiDownload className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDuplicateDataSet(dataSet)}
            className="p-2 hover:bg-green-50 rounded-lg text-green-600" 
            title="Duplicate"
          >
            <FiCopy className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleShareDataSet(dataSet)}
            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600" 
            title="Share"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
          {dataSet.type === 'live' && (
            <button 
              onClick={() => handleRefreshDataSet(dataSet.id)}
              disabled={refreshingDataSets.has(dataSet.id)}
              className="p-2 hover:bg-orange-50 rounded-lg text-orange-600 disabled:opacity-50" 
              title="Refresh"
            >
              <FiRefreshCw className={`w-4 h-4 ${refreshingDataSets.has(dataSet.id) ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const CreateDataSetModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-normal text-gray-800">Create New Dataset</h2>
              <p className="text-gray-600">Build filtered collections of records for analytics or workflows</p>
            </div>
            <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dataset Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., High-Value Leads"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Contacts</option>
                <option>Companies</option>
                <option>Deals</option>
                <option>Products</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="3"
              placeholder="Describe what this dataset contains..."
            ></textarea>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filters</label>
            <div className="border border-gray-300 rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableFilters.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-800 mb-2">{category.category}</h4>
                    <div className="space-y-1">
                      {category.filters.map((filter, filterIndex) => (
                        <label key={filterIndex} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700">{filter}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input type="radio" name="datasetType" value="live" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Live (updates automatically)</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="datasetType" value="static" className="mr-2" />
                <span className="text-sm text-gray-700">Static (snapshot in time)</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCreateDataSet()}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Create Dataset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-800 mb-2">Data Sets</h1>
            <p className="text-gray-600">Build, filter, and manage collections of records for analytics or workflows</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Create Dataset
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Datasets</p>
                <p className="text-2xl font-medium text-orange-600">{dataSets.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FiBarChart2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Live Datasets</p>
                <p className="text-2xl font-medium text-orange-600">{dataSets.filter(d => d.type === 'live').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiRefreshCw className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Records</p>
                <p className="text-2xl font-medium text-orange-600">{dataSets.reduce((sum, d) => sum + d.recordCount, 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Records/Set</p>
                <p className="text-2xl font-medium text-orange-600">{Math.round(dataSets.reduce((sum, d) => sum + d.recordCount, 0) / dataSets.length)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiGrid className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-lg font-medium text-gray-800">567 Contacts | 32% with Deals | 18% High Intent</h3>
          </div>
          <div className="flex gap-2">
            {['All', 'Live', 'Static', 'Contacts', 'Deals', 'Companies'].map(filter => (
              <button 
                key={filter}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSets.map(dataSet => (
            <DataSetCard key={dataSet.id} dataSet={dataSet} />
          ))}
        </div>
      </div>

      {/* Create Dataset Modal */}
      {showCreateModal && <CreateDataSetModal />}
      
      {/* Details Modal */}
      {showDetailsModal && selectedDataSet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Dataset Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${selectedDataSet.color} flex items-center justify-center`}>
                  <FiBarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-normal text-gray-800">{selectedDataSet.name}</h3>
                  <p className="text-sm text-gray-600">{selectedDataSet.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Entity</p>
                  <p className="font-medium">{selectedDataSet.entity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${selectedDataSet.type === 'live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedDataSet.type === 'live' ? 'Live' : 'Static'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Record Count</p>
                  <p className="font-medium">{selectedDataSet.recordCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">{selectedDataSet.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created By</p>
                  <p className="font-medium">{selectedDataSet.createdBy}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Filters Applied</p>
                <div className="space-y-1">
                  {selectedDataSet.filters.map((filter, index) => (
                    <div key={index} className="text-sm bg-gray-100 px-3 py-1 rounded">
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selectedDataSet.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button 
                  onClick={() => handleEditDataSet(selectedDataSet)}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Edit Dataset
                </button>
                <button 
                  onClick={() => handleExportDataSet(selectedDataSet)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Export
                </button>
                <button 
                  onClick={() => handleDuplicateDataSet(selectedDataSet)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSets;
