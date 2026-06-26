import React, { useState } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiSettings, FiEye, FiGitBranch, FiDatabase, FiLink, FiType, FiCalendar, FiHash, FiToggleLeft, FiCheck, FiX, FiArrowRight } from 'react-icons/fi';

const DataModel = () => {
  const [selectedEntity, setSelectedEntity] = useState('contacts');
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [, setEditingField] = useState(null);

  const entities = [
    {
      id: 'contacts',
      name: 'Contacts',
      type: 'default',
      description: 'Individual people in your CRM',
      fieldCount: 12,
      recordCount: 2341,
      color: 'bg-blue-100 text-blue-600',
      icon: '👤',
      relationships: ['deals', 'companies', 'activities']
    },
    {
      id: 'companies',
      name: 'Companies',
      type: 'default',
      description: 'Organizations and businesses',
      fieldCount: 8,
      recordCount: 456,
      color: 'bg-green-100 text-green-600',
      icon: '🏢',
      relationships: ['contacts', 'deals']
    },
    {
      id: 'deals',
      name: 'Deals',
      type: 'default',
      description: 'Sales opportunities and pipelines',
      fieldCount: 15,
      recordCount: 189,
      color: 'bg-orange-100 text-orange-600',
      icon: '💰',
      relationships: ['contacts', 'companies', 'products']
    },
    {
      id: 'products',
      name: 'Products',
      type: 'default',
      description: 'Items and services you sell',
      fieldCount: 6,
      recordCount: 23,
      color: 'bg-purple-100 text-purple-600',
      icon: '📦',
      relationships: ['deals']
    },
    {
      id: 'properties',
      name: 'Properties',
      type: 'custom',
      description: 'Real estate properties (Custom)',
      fieldCount: 18,
      recordCount: 67,
      color: 'bg-yellow-100 text-yellow-600',
      icon: '🏠',
      relationships: ['contacts', 'deals']
    },
    {
      id: 'subscriptions',
      name: 'Subscriptions',
      type: 'custom',
      description: 'Recurring billing subscriptions (Custom)',
      fieldCount: 9,
      recordCount: 234,
      color: 'bg-pink-100 text-pink-600',
      icon: '🔄',
      relationships: ['contacts', 'companies']
    }
  ];

  const fields = {
    contacts: [
      { id: 1, name: 'First Name', type: 'text', required: true, unique: false, defaultValue: '', validation: 'None' },
      { id: 2, name: 'Last Name', type: 'text', required: true, unique: false, defaultValue: '', validation: 'None' },
      { id: 3, name: 'Email', type: 'email', required: true, unique: true, defaultValue: '', validation: 'Email format' },
      { id: 4, name: 'Phone', type: 'phone', required: false, unique: false, defaultValue: '', validation: 'Phone format' },
      { id: 5, name: 'Company', type: 'lookup', required: false, unique: false, defaultValue: '', validation: 'Must exist in Companies' },
      { id: 6, name: 'Job Title', type: 'text', required: false, unique: false, defaultValue: '', validation: 'None' },
      { id: 7, name: 'Lead Score', type: 'number', required: false, unique: false, defaultValue: '0', validation: '0-100' },
      { id: 8, name: 'Created Date', type: 'date', required: true, unique: false, defaultValue: 'Now', validation: 'Valid date' },
      { id: 9, name: 'Status', type: 'select', required: true, unique: false, defaultValue: 'New', validation: 'New|Qualified|Customer' },
      { id: 10, name: 'Is Active', type: 'boolean', required: true, unique: false, defaultValue: 'true', validation: 'true/false' }
    ]
  };

  const versionHistory = [
    { id: 1, version: 'v2.3', date: '2 hours ago', user: 'John Doe', changes: 'Added "Lead Score" field to Contacts', type: 'field_added' },
    { id: 2, version: 'v2.2', date: '1 day ago', user: 'Jane Smith', changes: 'Created "Properties" custom entity', type: 'entity_created' },
    { id: 3, version: 'v2.1', date: '3 days ago', user: 'Mike Johnson', changes: 'Modified "Email" field validation in Contacts', type: 'field_modified' },
    { id: 4, version: 'v2.0', date: '1 week ago', user: 'Sarah Wilson', changes: 'Added relationship between Deals and Products', type: 'relationship_added' }
  ];

  const getFieldTypeIcon = (type) => {
    switch (type) {
      case 'text': return <FiType className="w-4 h-4" />;
      case 'number': return <FiHash className="w-4 h-4" />;
      case 'date': return <FiCalendar className="w-4 h-4" />;
      case 'boolean': return <FiToggleLeft className="w-4 h-4" />;
      case 'select': return <FiDatabase className="w-4 h-4" />;
      case 'lookup': return <FiLink className="w-4 h-4" />;
      default: return <FiType className="w-4 h-4" />;
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
    alert(`Editing field: ${field.name}`);
  };

  const handleDeleteField = (field) => {
    if (confirm(`Are you sure you want to delete the field "${field.name}"?`)) {
      alert(`Field "${field.name}" deleted successfully!`);
    }
  };

  const handleAddEntity = () => {
    setShowEntityModal(true);
  };

  const handleViewVersionHistory = () => {
    setShowVersionHistory(true);
  };

  const EntityCard = ({ entity }) => (
    <div 
      className={`bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow cursor-pointer ${
        selectedEntity === entity.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-orange-100'
      }`}
      onClick={() => setSelectedEntity(entity.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${entity.color} flex items-center justify-center text-2xl`}>
            {entity.icon}
          </div>
          <div>
            <h3 className="font-normal text-gray-800 flex items-center gap-2">
              {entity.name}
              {entity.type === 'custom' && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Custom</span>
              )}
            </h3>
            <p className="text-sm text-gray-600">{entity.description}</p>
          </div>
        </div>
        <button 
          onClick={() => alert(`Opening settings for ${entity.name}...`)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <FiSettings className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Fields</p>
          <p className="text-sm font-medium text-gray-800">{entity.fieldCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Records</p>
          <p className="text-sm font-medium text-gray-800">{entity.recordCount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Relationships</p>
        <div className="flex flex-wrap gap-1">
          {entity.relationships.map((rel, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center gap-1">
              <FiArrowRight className="w-3 h-3" />
              {rel}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const FieldRow = ({ field }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {getFieldTypeIcon(field.type)}
          <span className="font-medium text-gray-800">{field.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium capitalize">
          {field.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {field.required ? (
          <FiCheck className="w-4 h-4 text-green-600 mx-auto" />
        ) : (
          <FiX className="w-4 h-4 text-gray-400 mx-auto" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {field.unique ? (
          <FiCheck className="w-4 h-4 text-green-600 mx-auto" />
        ) : (
          <FiX className="w-4 h-4 text-gray-400 mx-auto" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {field.defaultValue || 'None'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {field.validation}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex gap-2">
          <button 
            onClick={() => handleEditField(field)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeleteField(field)}
            className="text-red-600 hover:text-red-800"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-6 bg-gray100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-800 mb-2">Data Model</h1>
            <p className="text-gray-600">Define how your data is structured and relates to each other</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAddEntity}
              className="flex items-center gap-2 bg-orange-500 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add Entity
            </button>
            <button 
              onClick={handleViewVersionHistory}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
            >
              <FiGitBranch className="w-4 h-4" />
              Version History
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Entities</p>
                <p className="text-2xl font-medium text-orange-600">{entities.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FiDatabase className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Custom Entities</p>
                <p className="text-2xl font-medium text-orange-600">{entities.filter(e => e.type === 'custom').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Fields</p>
                <p className="text-2xl font-medium text-orange-600">{entities.reduce((sum, e) => sum + e.fieldCount, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiType className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Records</p>
                <p className="text-2xl font-medium text-orange-600">{entities.reduce((sum, e) => sum + e.recordCount, 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiDatabase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Entity List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Entity Types</h2>
            <div className="space-y-4">
              {entities.map(entity => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
          </div>
          
          {/* Schema Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md border border-orange-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-normal text-gray-800">Schema Editor</h2>
                    <p className="text-gray-600">
                      {entities.find(e => e.id === selectedEntity)?.name} - 
                      {entities.find(e => e.id === selectedEntity)?.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAddFieldModal(true)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Field
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unique</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(fields[selectedEntity] || []).map(field => (
                      <FieldRow key={field.id} field={field} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Version History */}
            <div className="mt-6 bg-white rounded-lg shadow-md border border-orange-100 p-6">
              <h3 className="text-lg font-normal text-gray-800 mb-4 flex items-center gap-2">
                <FiGitBranch className="text-orange-600" />
                Recent Changes
              </h3>
              <div className="space-y-3">
                {versionHistory.slice(0, 4).map((version) => (
                  <div key={version.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      version.type === 'field_added' ? 'bg-green-100 text-green-600' :
                      version.type === 'entity_created' ? 'bg-blue-100 text-blue-600' :
                      version.type === 'field_modified' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {version.type === 'field_added' && <FiPlus className="w-4 h-4" />}
                      {version.type === 'entity_created' && <FiDatabase className="w-4 h-4" />}
                      {version.type === 'field_modified' && <FiEdit3 className="w-4 h-4" />}
                      {version.type === 'relationship_added' && <FiLink className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{version.changes}</p>
                      <p className="text-xs text-gray-500">{version.date} • {version.user} • {version.version}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Add New Field</h2>
              <button 
                onClick={() => setShowAddFieldModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter field name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="date">Date</option>
                  <option value="boolean">Boolean</option>
                  <option value="select">Select</option>
                  <option value="lookup">Lookup</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Required
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Unique
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    alert('Field added successfully!');
                    setShowAddFieldModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add Field
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddFieldModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Entity Modal */}
      {showEntityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Add New Entity</h2>
              <button 
                onClick={() => setShowEntityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entity Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter entity name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  placeholder="Describe this entity"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter emoji icon"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    alert('Entity created successfully!');
                    setShowEntityModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Create Entity
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEntityModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Version History Modal */}
      {showVersionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-normal text-gray-800">Version History</h2>
              <button 
                onClick={() => setShowVersionHistory(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {versionHistory.map((version) => (
                <div key={version.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${version.type === 'field_added' ? 'bg-green-100 text-green-600' : version.type === 'entity_created' ? 'bg-blue-100 text-blue-600' : version.type === 'field_modified' ? 'bg-yellow-100 text-yellow-600' : 'bg-purple-100 text-purple-600'}`}>
                      {version.type === 'field_added' && <FiPlus className="w-4 h-4" />}
                      {version.type === 'entity_created' && <FiDatabase className="w-4 h-4" />}
                      {version.type === 'field_modified' && <FiEdit3 className="w-4 h-4" />}
                      {version.type === 'relationship_added' && <FiLink className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">{version.version}</h3>
                        <span className="text-xs text-gray-500">{version.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{version.changes}</p>
                      <p className="text-xs text-gray-500">By {version.user}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Reverting to ${version.version}...`)}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                    >
                      Revert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataModel;
