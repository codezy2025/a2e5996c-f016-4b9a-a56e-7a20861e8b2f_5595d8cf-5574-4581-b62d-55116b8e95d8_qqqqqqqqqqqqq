/**
 * 🏗️  DEVELOPMENT GUIDE - Login Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Login>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum LoginStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type LoginSearchParams = Pick<Login, 'name' | 'status'>
 * - export type LoginUpdateData = Partial<Omit<Login, 'id' | 'createdAt'>>
 */

export interface Login {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginErrorResponse {
  message: string;
  statusCode: number;
}