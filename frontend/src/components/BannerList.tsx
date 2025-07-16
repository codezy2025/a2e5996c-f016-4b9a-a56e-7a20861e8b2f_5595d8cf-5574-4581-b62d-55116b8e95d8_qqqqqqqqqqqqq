/**
 * 🏗️  DEVELOPMENT GUIDE - Banner List Component
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
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 px-4 md:px-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Beauty Salon for Women</h1>
        <p className="text-lg text-gray-600">Experience luxury beauty treatments tailored for you</p>
        <Link 
          to="/appointments" 
          className="btn btn-primary px-6 py-3 text-lg"
        >
          Get an Appointment
        </Link>
      </div>
      <div className="order-first md:order-last">
        <img 
          src="/images/hero.jpg" 
          alt="Beauty salon interior" 
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;