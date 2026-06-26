import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FiMoreVertical, FiChevronDown, FiChevronUp, FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ComplexTable = ({ title, data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
        pagination: {
            pageSize: 5, // Show 5 rows per page
        },
    },
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800">{title}</h2>
        <input 
          type="text"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
          placeholder="Search..."
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
              <th key={header.id} className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{
                asc: <FiChevronUp className="inline ml-2" />, 
                desc: <FiChevronDown className="inline ml-2" />
                }[header.column.getIsSorted()] ?? null}
              </th>
              ))}
            </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-4 whitespace-nowrap text-gray-700 font-medium">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
              ))}
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <span className="text-sm text-gray-600">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><FiChevronsLeft /></button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><FiChevronLeft /></button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><FiChevronRight /></button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><FiChevronsRight /></button>
        </div>
      </div>
    </div>
  );
};

export default ComplexTable;
