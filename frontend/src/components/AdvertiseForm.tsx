/**
 * 🏗️  DEVELOPMENT GUIDE - Advertise Form Component
 * 
 * 📋 Original Requirements: Generate a React TSX component that displays company statistics in a responsive grid layout. The component should use Tailwind CSS for styling and include three stat items (Happy Customers, Years Experience, Branches) with proper TypeScript typing. The layout should be a 3-column grid on desktop and stack vertically on mobile.
 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Advertise> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { useForm } from 'react-hook-form';
import { AdvertiseFormData } from '../types/AdvertiseTypes';

interface AdvertiseFormProps {
  onSubmit: (data: AdvertiseFormData) => void;
}

const AdvertiseForm = ({ onSubmit }: AdvertiseFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AdvertiseFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="happyCustomers" className="block text-sm font-medium text-gray-700">
            Happy Customers
          </label>
          <input
            id="happyCustomers"
            type="number"
            {...register('happyCustomers', { required: 'Happy Customers is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.happyCustomers && (
            <p className="mt-2 text-sm text-red-600">{errors.happyCustomers.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700">
            Years Experience
          </label>
          <input
            id="yearsExperience"
            type="number"
            {...register('yearsExperience', { required: 'Years Experience is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.yearsExperience && (
            <p className="mt-2 text-sm text-red-600">{errors.yearsExperience.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="branches" className="block text-sm font-medium text-gray-700">
            Branches
          </label>
          <input
            id="branches"
            type="number"
            {...register('branches', { required: 'Branches is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.branches && (
            <p className="mt-2 text-sm text-red-600">{errors.branches.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default AdvertiseForm;