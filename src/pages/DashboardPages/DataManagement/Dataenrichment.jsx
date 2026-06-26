import React, { useState } from 'react';
import { FiPlus, FiRefreshCw, FiSettings, FiCheck, FiX, FiAlertTriangle, FiExternalLink, FiDollarSign, FiTrendingUp, FiUsers, FiMail, FiBriefcase, FiGlobe, FiZap, FiEye, FiArrowRight } from 'react-icons/fi';

const DataEnrichment = () => {
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [selectedEnrichmentSource, setSelectedEnrichmentSource] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [enrichingSource, setEnrichingSource] = useState(null);

  const enrichmentSources = [
    {
      id: 1,
      name: 'LinkedIn API',
      type: 'Professional Data',
      status: 'active',
      matchRate: '87%',
      creditsUsed: 1247,
      creditsLimit: 5000,
      cost: '$0.15 per record',
      icon: '💼',
      color: 'bg-blue-100 text-blue-600',
      enriches: ['Job Title', 'Company', 'LinkedIn URL', 'Skills']
    },
    {
      id: 2,
      name: 'Clearbit',
      type: 'Company Data',
      status: 'active',
      matchRate: '92%',
      creditsUsed: 523,
      creditsLimit: 2000,
      cost: '$0.25 per record',
      icon: '🏢',
      color: 'bg-green-100 text-green-600',
      enriches: ['Company Size', 'Industry', 'Revenue', 'Location']
    },
    {
      id: 3,
      name: 'BuiltWith',
      type: 'Technology Stack',
      status: 'limited',
      matchRate: '74%',
      creditsUsed: 1890,
      creditsLimit: 2000,
      cost: '$0.10 per record',
      icon: '⚙️',
      color: 'bg-purple-100 text-purple-600',
      enriches: ['Tech Stack', 'CMS', 'Analytics', 'Hosting']
    },
    {
      id: 4,
      name: 'Custom API',
      type: 'Internal Data',
      status: 'error',
      matchRate: '0%',
      creditsUsed: 0,
      creditsLimit: 1000,
      cost: 'Free',
      icon: '🔧',
      color: 'bg-gray-100 text-gray-600',
      enriches: ['Custom Fields', 'Internal Scores']
    }
  ];

  const enrichmentRules = [
    {
      id: 1,
      name: 'Auto-enrich New Contacts',
      trigger: 'On Contact Creation',
      sources: ['LinkedIn API', 'Clearbit'],
      status: 'active',
      lastRun: '2 minutes ago',
      recordsProcessed: 45
    },
    {
      id: 2,
      name: 'Company Data Enhancement',
      trigger: 'On Deal Update',
      sources: ['Clearbit', 'BuiltWith'],
      status: 'active',
      lastRun: '1 hour ago',
      recordsProcessed: 12
    },
    {
      id: 3,
      name: 'Weekly Batch Enrichment',
      trigger: 'Weekly Schedule',
      sources: ['LinkedIn API'],
      status: 'paused',
      lastRun: '3 days ago',
      recordsProcessed: 234
    }
  ];

  const enrichmentLogs = [
    { id: 1, type: 'success', message: '45 contacts enriched with LinkedIn data', time: '2 minutes ago', source: 'LinkedIn API' },
    { id: 2, type: 'success', message: '12 companies enriched with Clearbit data', time: '1 hour ago', source: 'Clearbit' },
    { id: 3, type: 'error', message: 'Custom API connection failed', time: '2 hours ago', source: 'Custom API' },
    { id: 4, type: 'warning', message: 'BuiltWith credits running low (95% used)', time: '3 hours ago', source: 'BuiltWith' },
    { id: 5, type: 'success', message: '89 records enriched in batch process', time: '1 day ago', source: 'LinkedIn API' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><FiCheck className="w-3 h-3" /> Active</span>;
      case 'limited':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><FiAlertTriangle className="w-3 h-3" /> Limited</span>;
      case 'error':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><FiX className="w-3 h-3" /> Error</span>;
      case 'paused':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Paused</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const handleViewDetails = (source) => {
    setSelectedEnrichmentSource(source);
    setShowDetailsModal(true);
  };

  const handleEnrichNow = async (sourceId) => {
    setEnrichingSource(sourceId);
    // Simulate enrichment process
    setTimeout(() => {
      setEnrichingSource(null);
      alert('Enrichment completed successfully!');
    }, 3000);
  };

  const EnrichmentSourceCard = ({ source }) => (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${source.color} flex items-center justify-center text-2xl`}>
            {source.icon}
          </div>
          <div>
            <h3 className="font-normal text-gray-800">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(source.status)}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FiSettings className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Match Rate</p>
          <p className="text-sm font-medium text-gray-800">{source.matchRate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Cost</p>
          <p className="text-sm font-medium text-gray-800">{source.cost}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Credits Usage</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full" 
            style={{ width: `${(source.creditsUsed / source.creditsLimit) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">{source.creditsUsed.toLocaleString()} / {source.creditsLimit.toLocaleString()} used</p>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Enriches</p>
        <div className="flex flex-wrap gap-1">
          {source.enriches.map((field, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {field}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => handleEnrichNow(source.id)}
          disabled={enrichingSource === source.id}
          className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm font-medium disabled:opacity-50"
        >
          {enrichingSource === source.id ? 'Enriching...' : 'Enrich Now'}
        </button>
        <button 
          onClick={() => handleViewDetails(source)}
          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-800 mb-2">Data Enrichment</h1>
            <p className="text-gray-600">Enhance your raw data with publicly or privately available datasets</p>
          </div>
          <button 
            onClick={() => setShowRulesModal(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            <FiSettings className="w-4 h-4" />
            Manage Rules
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Records Enriched</p>
                <p className="text-2xl font-medium text-orange-600">3,660</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-2xl font-medium text-orange-600">84.3%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Credits Used</p>
                <p className="text-2xl font-medium text-orange-600">3,660</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Sources</p>
                <p className="text-2xl font-medium text-orange-600">{enrichmentSources.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiZap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6 mb-8">
          <h3 className="text-lg font-normal text-gray-800 mb-3 flex items-center gap-2">
            💡 Smart Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-orange-100">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Add LinkedIn data to your leads</strong> with 87% match rate using LinkedIn API.
              </p>
              <button className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">
                Enable Auto-Enrichment
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-100">
              <p className="text-sm text-gray-700 mb-2">
                <strong>BuiltWith credits running low</strong> - Consider upgrading your plan or reducing usage.
              </p>
              <button className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-amber-700">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrichment Sources */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Enrichment Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrichmentSources.map(source => (
                <EnrichmentSourceCard key={source.id} source={source} />
              ))}
            </div>
          </div>
          
          {/* Enrichment Logs */}
          <div>
            <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {enrichmentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      log.type === 'success' ? 'bg-green-100 text-green-600' :
                      log.type === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {log.type === 'success' && <FiCheck className="w-4 h-4" />}
                      {log.type === 'error' && <FiX className="w-4 h-4" />}
                      {log.type === 'warning' && <FiAlertTriangle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{log.message}</p>
                      <p className="text-xs text-gray-500">{log.time} • {log.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Modal */}
      {showDetailsModal && selectedEnrichmentSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Enrichment Source Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${selectedEnrichmentSource.color} flex items-center justify-center text-2xl`}>
                  {selectedEnrichmentSource.icon}
                </div>
                <div>
                  <h3 className="font-normal text-gray-800">{selectedEnrichmentSource.name}</h3>
                  <p className="text-sm text-gray-600">{selectedEnrichmentSource.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedEnrichmentSource.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Match Rate</p>
                  <p className="font-medium">{selectedEnrichmentSource.matchRate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credits Used</p>
                  <p className="font-medium">{selectedEnrichmentSource.creditsUsed}/{selectedEnrichmentSource.creditsLimit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="font-medium">{selectedEnrichmentSource.cost}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Enriches Fields</p>
                <div className="flex flex-wrap gap-1">
                  {selectedEnrichmentSource.enriches.map((field, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button 
                  onClick={() => alert('Opening configuration...')}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Configure
                </button>
                <button 
                  onClick={() => alert('Pausing enrichment source...')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Pause
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Enrichment Rules</h2>
              <button 
                onClick={() => setShowRulesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {enrichmentRules.map((rule) => (
                <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{rule.name}</h3>
                    {getStatusBadge(rule.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Trigger: {rule.trigger}</p>
                  <p className="text-sm text-gray-600 mb-2">Sources: {rule.sources.join(', ')}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Last run: {rule.lastRun}</span>
                    <span>{rule.recordsProcessed} records processed</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => alert(`Editing rule: ${rule.name}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => alert(`${rule.status === 'active' ? 'Pausing' : 'Activating'} rule: ${rule.name}`)}
                      className={`px-3 py-1 rounded text-xs ${rule.status === 'active' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                      {rule.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => alert('Creating new enrichment rule...')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Add New Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEnrichment;