/**
 * 🏗️  DEVELOPMENT GUIDE - Register Types
 * 
 * 📋 Original Requirements: Create a complete Register module with: 1) A TypeScript interface for User data, 2) A Register form component with email/password fields, validation, and submission handling, 3) API service integration for registration, 4) Error handling for common registration scenarios
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Register>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum RegisterStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type RegisterSearchParams = Pick<Register, 'name' | 'status'>
 * - export type RegisterUpdateData = Partial<Omit<Register, 'id' | 'createdAt'>>
 */

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}