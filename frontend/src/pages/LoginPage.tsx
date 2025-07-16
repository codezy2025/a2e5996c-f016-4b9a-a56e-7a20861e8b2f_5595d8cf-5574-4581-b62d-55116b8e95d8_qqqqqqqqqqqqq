/**
 * 🏗️  DEVELOPMENT GUIDE - Login Page Component
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
import LoginForm from '../components/LoginForm';
import LoginList from '../components/LoginList';
import loginService from '../services/loginService';
import { Login, LoginFormData } from '../types/LoginTypes';

const LoginPage: React.FC = () => {
  const [logins, setLogins] = useState<Login[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLogin, setSelectedLogin] = useState<Login | null>(null);

  useEffect(() => {
    fetchLogins();
  }, []);

  const fetchLogins = async () => {
    setLoading(true);
    try {
      const data = await loginService.getAll();
      setLogins(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch logins');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: LoginFormData) => {
    setLoading(true);
    try {
      const newLogin = await loginService.create(formData);
      setLogins([...logins, newLogin]);
      setError(null);
    } catch (err) {
      setError('Failed to create login');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: LoginFormData) => {
    setLoading(true);
    try {
      const updatedLogin = await loginService.update(id, formData);
      setLogins(logins.map(login => login.id === id ? updatedLogin : login));
      setSelectedLogin(null);
      setError(null);
    } catch (err) {
      setError('Failed to update login');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await loginService.delete(id);
      setLogins(logins.filter(login => login.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete login');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (login: Login) => {
    setSelectedLogin(login);
  };

  return (
    <div>
      <h1>Login Management</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <LoginForm 
        onSubmit={selectedLogin ? (data) => handleUpdate(selectedLogin.id, data) : handleCreate}
        initialData={selectedLogin}
        onCancel={() => setSelectedLogin(null)}
      />
      
      <LoginList 
        logins={logins} 
        onEdit={handleSelect} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default LoginPage;