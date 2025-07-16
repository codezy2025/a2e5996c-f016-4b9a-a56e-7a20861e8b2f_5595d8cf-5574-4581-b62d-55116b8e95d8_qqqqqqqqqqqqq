/**
 * 🏗️  DEVELOPMENT GUIDE - Login List Component
 * 
 * 📋 Original Requirements: Create a complete Login module with the following features:
1. A form with email and password fields
2. Form validation (email format, password requirements)
3. API call to /api/auth/login endpoint
4. JWT token handling (storage in localStorage)
5. Loading states and error handling
6. Redirect on successful login
7. Responsive design with styling
8. Types for all props and API responses
9. Unit test scaffolding
 * 
 * 🚀 Enhancement Ideas:
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import React from 'react';
import { useTable } from '@tanstack/react-table';
import { LoginData } from '../types/LoginTypes';

interface LoginListProps {
  data: LoginData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LoginList: React.FC<LoginListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Password',
        accessorKey: 'password',
        cell: () => '••••••••',
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: { original: { id: string } } }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(row.original.id)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useTable({
    data,
    columns,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.column.columnDef.header as string}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginList;