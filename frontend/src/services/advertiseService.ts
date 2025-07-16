/**
 * 🏗️  DEVELOPMENT GUIDE - Advertise Service
 * 
 * 📋 Original Requirements: Generate a React TSX component that displays company statistics in a responsive grid layout. The component should use Tailwind CSS for styling and include three stat items (Happy Customers, Years Experience, Branches) with proper TypeScript typing. The layout should be a 3-column grid on desktop and stack vertically on mobile.
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
 * - search(query: string): Promise<Advertise[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{AdvertiseStats}>
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
import { Advertise, AdvertiseCreate, AdvertiseUpdate } from '../types/AdvertiseTypes';

const API_BASE_URL = 'http://localhost:3000/api/advertises';

const getAll = async (): Promise<Advertise[]> => {
  const response = await axios.get<Advertise[]>(API_BASE_URL);
  return response.data;
};

const create = async (advertiseData: AdvertiseCreate): Promise<Advertise> => {
  const response = await axios.post<Advertise>(API_BASE_URL, advertiseData);
  return response.data;
};

const update = async (id: string, advertiseData: AdvertiseUpdate): Promise<Advertise> => {
  const response = await axios.put<Advertise>(`${API_BASE_URL}/${id}`, advertiseData);
  return response.data;
};

const deleteAdvertise = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const advertiseService = {
  getAll,
  create,
  update,
  delete: deleteAdvertise
};