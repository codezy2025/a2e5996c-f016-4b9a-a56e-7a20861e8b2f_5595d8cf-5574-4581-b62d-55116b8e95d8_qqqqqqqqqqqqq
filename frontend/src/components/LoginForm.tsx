/**
 * 🏗️  DEVELOPMENT GUIDE - Login Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Login> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData, LoginFormProps } from '../types/LoginTypes';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;