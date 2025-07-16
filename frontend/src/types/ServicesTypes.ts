/**
 * 🏗️  DEVELOPMENT GUIDE - Services Service
 * 
 * 📋 Original Requirements: Generate TypeScript React components for a salon services module with responsive grid layout, including ServiceCard component and Services grid container. Use Tailwind CSS and DaisyUI for styling.
 * 
 * 🚀 Enhancement Ideas:
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Services[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ServicesStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface ServicesFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
}