/**
 * 🏗️  DEVELOPMENT GUIDE - Services List Component
 * 
 * 📋 Original Requirements: Generate TypeScript React components for a salon services module with responsive grid layout, including ServiceCard component and Services grid container. Use Tailwind CSS and DaisyUI for styling.
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

import { Service } from '../types/ServicesTypes';
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface ServicesListProps {
  data: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const ServicesList = ({ data, onEdit, onDelete }: ServicesListProps) => {
  const columns = useMemo<ColumnDef<Service>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Duration',
        accessorKey: 'duration',
      },
      {
        header: 'Price',
        accessorKey: 'price',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => onDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesList;