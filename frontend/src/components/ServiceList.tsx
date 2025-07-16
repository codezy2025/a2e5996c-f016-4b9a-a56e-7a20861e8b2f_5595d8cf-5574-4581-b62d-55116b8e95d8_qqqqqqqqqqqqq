/**
 * 🏗️  DEVELOPMENT GUIDE - Service List Component
 * 
 * 📋 Original Requirements: Generate ONLY these 3 TypeScript React files for a beauty salon services module:

1. Service.tsx - Individual service card component with:
   - Props: { image: string, title: string, price: string, description: string }
   - Image display with alt text
   - Title as h3 element
   - Price displayed in custom primary color (#FF2E93)
   - Description text
   - Tailwind CSS styling with card shadow and rounded corners
   - Responsive width

2. Services.tsx - Container component with:
   - Props: { services: Array<{ image: string, title: string, price: string, description: string }> }
   - Section header 'Our Awesome Services' with centered text
   - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
   - 'Explore More' button using DaisyUI at bottom
   - Maps through services array to render Service components

3. ServiceTypes.ts - Type definitions for:
   - Service interface { image: string, title: string, price: string, description: string }
   - ServicesProps interface { services: Service[] }

Do NOT generate any additional files like Form, List, or Page components.
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

import { Service } from '../types/ServiceTypes';
import { useTable, Column } from '@tanstack/react-table';

interface ServiceListProps {
  data: Service[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ServiceList = ({ data, onEdit, onDelete }: ServiceListProps) => {
  const columns: Column<Service>[] = [
    {
      accessorKey: 'title',
      header: 'Service',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row.original.id)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const table = useTable({
    data,
    columns,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {cell.renderCell()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceList;