/**
 * 🏗️  DEVELOPMENT GUIDE - Services Form Component
 * 
 * 📋 Original Requirements: Generate TypeScript React components for a salon services module with responsive grid layout, including ServiceCard component and Services grid container. Use Tailwind CSS and DaisyUI for styling.
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
 * - initialData?: Partial<Services> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { useForm } from 'react-hook-form';
import { ServiceFormData } from '../types/ServicesTypes';

interface ServicesFormProps {
  onSubmit: (data: ServiceFormData) => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Service Name</span>
        </label>
        <input
          type="text"
          placeholder="Service name"
          className="input input-bordered w-full"
          {...register('name', { required: 'Service name is required' })}
        />
        {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          {...register('price', { required: 'Price is required', min: 0 })}
        />
        {errors.price && <span className="text-error text-sm">{errors.price.message}</span>}
      </div>

      <div className="form-control md:col-span-2">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          {...register('description')}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Duration (minutes)</span>
        </label>
        <input
          type="number"
          placeholder="Duration"
          className="input input-bordered w-full"
          {...register('duration', { required: 'Duration is required', min: 1 })}
        />
        {errors.duration && <span className="text-error text-sm">{errors.duration.message}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select select-bordered w-full"
          {...register('category', { required: 'Category is required' })}
        >
          <option value="">Select category</option>
          <option value="hair">Hair</option>
          <option value="nails">Nails</option>
          <option value="skincare">Skincare</option>
          <option value="massage">Massage</option>
        </select>
        {errors.category && <span className="text-error text-sm">{errors.category.message}</span>}
      </div>

      <div className="form-control md:col-span-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServicesForm;