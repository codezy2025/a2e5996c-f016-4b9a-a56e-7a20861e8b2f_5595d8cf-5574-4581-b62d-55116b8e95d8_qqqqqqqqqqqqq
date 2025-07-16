/**
 * 🏗️  DEVELOPMENT GUIDE - Login Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Login[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{LoginStats}>
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
import { Login, LoginCreateRequest, LoginUpdateRequest } from '../types/LoginTypes';

const API_BASE_URL = 'http://localhost:3000/api/logins';

export const loginService = {
    getAll: async (): Promise<Login[]> => {
        const response = await axios.get<Login[]>(API_BASE_URL);
        return response.data;
    },

    create: async (loginData: LoginCreateRequest): Promise<Login> => {
        const response = await axios.post<Login>(API_BASE_URL, loginData);
        return response.data;
    },

    update: async (id: string, loginData: LoginUpdateRequest): Promise<Login> => {
        const response = await axios.put<Login>(`${API_BASE_URL}/${id}`, loginData);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};