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

import axios from 'axios';
import { Service, ServiceCreate, ServiceUpdate } from '../types/ServicesTypes';

const API_BASE_URL = 'http://localhost:3000/api/services';

export const servicesService = {
    getAll: async (): Promise<Service[]> => {
        const response = await axios.get<Service[]>(API_BASE_URL);
        return response.data;
    },
    create: async (serviceData: ServiceCreate): Promise<Service> => {
        const response = await axios.post<Service>(API_BASE_URL, serviceData);
        return response.data;
    },
    update: async (id: string, serviceData: ServiceUpdate): Promise<Service> => {
        const response = await axios.put<Service>(`${API_BASE_URL}/${id}`, serviceData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};