/**
 * 🏗️  DEVELOPMENT GUIDE - Advertise Types
 * 
 * 📋 Original Requirements: Generate a React TSX component that displays company statistics in a responsive grid layout. The component should use Tailwind CSS for styling and include three stat items (Happy Customers, Years Experience, Branches) with proper TypeScript typing. The layout should be a 3-column grid on desktop and stack vertically on mobile.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Advertise>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum AdvertiseStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type AdvertiseSearchParams = Pick<Advertise, 'name' | 'status'>
 * - export type AdvertiseUpdateData = Partial<Omit<Advertise, 'id' | 'createdAt'>>
 */

export interface Advertise {
  happyCustomers: number;
  yearsExperience: number;
  branches: number;
}

export interface AdvertiseFormData {
  happyCustomers: string;
  yearsExperience: string;
  branches: string;
}