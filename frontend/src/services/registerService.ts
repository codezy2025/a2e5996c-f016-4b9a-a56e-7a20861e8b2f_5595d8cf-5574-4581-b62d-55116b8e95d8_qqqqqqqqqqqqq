/**
 * 🏗️  DEVELOPMENT GUIDE - Register Service
 * 
 * 📋 Original Requirements: Create a complete Register module with: 1) A TypeScript interface for User data, 2) A Register form component with email/password fields, validation, and submission handling, 3) API service integration for registration, 4) Error handling for common registration scenarios
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
 * - search(query: string): Promise<Register[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{RegisterStats}>
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
import { Register, RegisterCreate, RegisterUpdate } from '../types/RegisterTypes';

const API_BASE_URL = 'http://localhost:3000/api/registers';

const getAll = async (): Promise<Register[]> => {
    const response = await axios.get<Register[]>(API_BASE_URL);
    return response.data;
};

const create = async (registerData: RegisterCreate): Promise<Register> => {
    const response = await axios.post<Register>(API_BASE_URL, registerData);
    return response.data;
};

const update = async (id: string, registerData: RegisterUpdate): Promise<Register> => {
    const response = await axios.put<Register>(`${API_BASE_URL}/${id}`, registerData);
    return response.data;
};

const deleteById = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const registerService = {
    getAll,
    create,
    update,
    deleteById,
};