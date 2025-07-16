/**
 * 🏗️  DEVELOPMENT GUIDE - Advertise Page Component
 * 
 * 📋 Original Requirements: Generate a React TSX component that displays company statistics in a responsive grid layout. The component should use Tailwind CSS for styling and include three stat items (Happy Customers, Years Experience, Branches) with proper TypeScript typing. The layout should be a 3-column grid on desktop and stack vertically on mobile.
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
import AdvertiseForm from '../components/AdvertiseForm';
import AdvertiseList from '../components/AdvertiseList';
import advertiseService from '../services/advertiseService';
import { Advertise } from '../types/AdvertiseTypes';

const AdvertisePage: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAd, setCurrentAd] = useState<Advertise | null>(null);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const data = await advertiseService.getAll();
      setAdvertisements(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (advertise: Advertise) => {
    try {
      if (currentAd) {
        await advertiseService.update(currentAd.id, advertise);
      } else {
        await advertiseService.create(advertise);
      }
      fetchAdvertisements();
      setCurrentAd(null);
    } catch (err) {
      setError('Failed to save advertisement');
    }
  };

  const handleEdit = (advertise: Advertise) => {
    setCurrentAd(advertise);
  };

  const handleDelete = async (id: string) => {
    try {
      await advertiseService.remove(id);
      fetchAdvertisements();
    } catch (err) {
      setError('Failed to delete advertisement');
    }
  };

  return (
    <div>
      <h1>Advertisements</h1>
      {error && <div className="error">{error}</div>}
      <AdvertiseForm onSubmit={handleSubmit} currentAd={currentAd} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AdvertiseList
          advertisements={advertisements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdvertisePage;