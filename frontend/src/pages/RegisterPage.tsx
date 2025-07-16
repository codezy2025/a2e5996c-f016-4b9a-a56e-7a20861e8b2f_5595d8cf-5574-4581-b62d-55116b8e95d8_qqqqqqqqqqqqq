/**
 * 🏗️  DEVELOPMENT GUIDE - Register Page Component
 * 
 * 📋 Original Requirements: Create a complete Register module with: 1) A TypeScript interface for User data, 2) A Register form component with email/password fields, validation, and submission handling, 3) API service integration for registration, 4) Error handling for common registration scenarios
 * 
 * 🚀 Enhancement Ideas:
 * - Add URL-based filtering and search
 * - Implement breadcrumb navigation
 * - Add export/import functionality
 * - Include real-time updates (WebSocket/SSE)
 * - Add keyboard shortcuts for common actions
 * - Implement undo/redo functionality
 * 
 * 💡 State Management Improvements:
 * - Use useReducer for complex state logic
 * - Add optimistic updates for better UX
 * - Implement proper error boundaries
 * - Add loading skeletons instead of spinners
 * 
 * 🔧 User Experience:
 * - Add confirmation dialogs for destructive actions
 * - Implement toast notifications for feedback
 * - Add drag-and-drop for reordering
 * - Include accessibility features (ARIA labels)
 * 
 * 📱 Responsive Design:
 * - Add mobile-specific components
 * - Implement swipe actions for mobile
 * - Consider drawer/modal layouts for small screens
 */

import React, { useState, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import RegisterList from '../components/RegisterList';
import registerService from '../services/registerService';
import { Register } from '../types/RegisterTypes';

const RegisterPage: React.FC = () => {
  const [registers, setRegisters] = useState<Register[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRegister, setCurrentRegister] = useState<Register | null>(null);

  useEffect(() => {
    fetchRegisters();
  }, []);

  const fetchRegisters = async () => {
    try {
      setLoading(true);
      const data = await registerService.getAll();
      setRegisters(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch registers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (register: Register) => {
    try {
      setLoading(true);
      if (currentRegister) {
        await registerService.update(register.id, register);
      } else {
        await registerService.create(register);
      }
      await fetchRegisters();
      setCurrentRegister(null);
    } catch (err) {
      setError('Failed to save register');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await registerService.delete(id);
      await fetchRegisters();
    } catch (err) {
      setError('Failed to delete register');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (register: Register) => {
    setCurrentRegister(register);
  };

  return (
    <div>
      <h1>Register Management</h1>
      {error && <div className="error">{error}</div>}
      <RegisterForm 
        onSubmit={handleSubmit} 
        currentRegister={currentRegister} 
        loading={loading} 
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <RegisterList 
          registers={registers} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      )}
    </div>
  );
};

export default RegisterPage;