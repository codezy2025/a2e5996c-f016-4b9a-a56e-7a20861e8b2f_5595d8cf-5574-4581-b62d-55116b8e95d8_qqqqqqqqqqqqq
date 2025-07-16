/**
 * 🏗️  DEVELOPMENT GUIDE - Service Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ServiceStats}>
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
  image: string;
  title: string;
  price: string;
  description: string;
}

export interface ServiceFormData {
  image: string;
  title: string;
  price: string;
  description: string;
}