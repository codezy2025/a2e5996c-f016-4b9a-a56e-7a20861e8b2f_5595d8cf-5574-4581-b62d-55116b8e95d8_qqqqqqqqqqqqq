/**
 * 🏗️  DEVELOPMENT GUIDE - Advertise List Component
 * 
 * 📋 Original Requirements: Generate a React TSX component that displays company statistics in a responsive grid layout. The component should use Tailwind CSS for styling and include three stat items (Happy Customers, Years Experience, Branches) with proper TypeScript typing. The layout should be a 3-column grid on desktop and stack vertically on mobile.
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

import { Advertise } from '../types/AdvertiseTypes';

interface AdvertiseListProps {
  data: Advertise[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdvertiseList = ({ data, onEdit, onDelete }: AdvertiseListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseList;