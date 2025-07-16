/**
 * 🏗️  DEVELOPMENT GUIDE - Banner Service
 * 
 * 📋 Original Requirements: Generate ONLY the Banner component TSX file with the following specifications:

1. Component Name: Banner.tsx
2. No props interface needed (static content)
3. Content:
   - Heading: 'Beauty Salon for Women'
   - Subheading: 'Experience luxury beauty treatments tailored for you'
   - CTA Button: 'Get an Appointment' (links to '/appointments' using React Router Link)
   - Hero image: '/images/hero.jpg' with alt text
4. Styling:
   - Tailwind CSS classes for responsive layout (grid on desktop, stacked on mobile)
   - DaisyUI 'btn btn-primary' classes for the button
5. Structure:
   - Two-column layout on desktop (text left, image right)
   - Full-width stacked on mobile
6. Include proper TypeScript typing for the component
7. Use React Router's Link component for navigation
8. No state management needed
9. Export as default component
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
 * - search(query: string): Promise<Banner[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{BannerStats}>
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

import axios from 'axios';
import { Banner, BannerCreate, BannerUpdate } from '../types/BannerTypes';

const API_BASE_URL = '/api/banners';

const getAll = async (): Promise<Banner[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

const create = async (bannerData: BannerCreate): Promise<Banner> => {
  const response = await axios.post(API_BASE_URL, bannerData);
  return response.data;
};

const update = async (id: string, bannerData: BannerUpdate): Promise<Banner> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, bannerData);
  return response.data;
};

const deleteBanner = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const bannerService = {
  getAll,
  create,
  update,
  delete: deleteBanner
};