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

import React, { useState, useEffect } from 'react';
import ServicesForm from '../components/ServicesForm';
import ServicesList from '../components/ServicesList';
import servicesService from '../services/servicesService';
import { Service, ServiceFormData } from '../types/ServicesTypes';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: ServiceFormData) => {
    try {
      setLoading(true);
      const newService = await servicesService.create(formData);
      setServices([...services, newService]);
      setError(null);
    } catch (err) {
      setError('Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: ServiceFormData) => {
    try {
      setLoading(true);
      const updatedService = await servicesService.update(id, formData);
      setServices(services.map(s => s.id === id ? updatedService : s));
      setEditingService(null);
      setError(null);
    } catch (err) {
      setError('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await servicesService.delete(id);
      setServices(services.filter(s => s.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  return (
    <div>
      <h1>Services Management</h1>
      {error && <div className="error">{error}</div>}
      <ServicesForm
        onSubmit={editingService ? (data) => handleUpdate(editingService.id, data) : handleCreate}
        onCancel={editingService ? handleCancelEdit : undefined}
        initialData={editingService}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ServicesList
          services={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ServicesPage;