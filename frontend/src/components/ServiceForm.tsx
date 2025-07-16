/**
 * 🏗️  DEVELOPMENT GUIDE - Service Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Service> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { useForm } from 'react-hook-form';
import { ServiceFormData } from '../types/ServiceTypes';

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          type="text"
          {...register('price', { required: 'Price is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default ServiceForm;