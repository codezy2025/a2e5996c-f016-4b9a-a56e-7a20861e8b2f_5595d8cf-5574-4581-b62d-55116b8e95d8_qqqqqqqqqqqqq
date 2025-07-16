/**
 * 🏗️  DEVELOPMENT GUIDE - Banner Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Banner> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl font-bold mb-4">Beauty Salon for Women</h1>
          <p className="text-xl mb-6">Experience luxury beauty treatments tailored for you</p>
          <Link 
            to="/appointments" 
            className="btn btn-primary"
          >
            Get an Appointment
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="/images/hero.jpg" 
            alt="Beauty Salon" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;