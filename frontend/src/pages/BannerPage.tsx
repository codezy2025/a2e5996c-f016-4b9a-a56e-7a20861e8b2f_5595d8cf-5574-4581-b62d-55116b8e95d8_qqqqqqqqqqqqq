/**
 * 🏗️  DEVELOPMENT GUIDE - Banner Page Component
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
import BannerForm from '../components/BannerForm';
import BannerList from '../components/BannerList';
import bannerService from '../services/bannerService';
import { Banner } from '../types/BannerTypes';

const BannerPage: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await bannerService.getAll();
      setBanners(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (banner: Banner) => {
    try {
      await bannerService.create(banner);
      await fetchBanners();
    } catch (err) {
      setError('Failed to create banner');
    }
  };

  const handleUpdate = async (banner: Banner) => {
    try {
      await bannerService.update(banner.id, banner);
      await fetchBanners();
      setCurrentBanner(null);
    } catch (err) {
      setError('Failed to update banner');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await bannerService.delete(id);
      await fetchBanners();
    } catch (err) {
      setError('Failed to delete banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setCurrentBanner(banner);
  };

  return (
    <div>
      <h1>Banner Management</h1>
      {error && <div className="error">{error}</div>}
      <BannerForm 
        onSubmit={currentBanner ? handleUpdate : handleCreate}
        initialData={currentBanner}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BannerList 
          banners={banners} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default BannerPage;