/**
 * 🏗️  DEVELOPMENT GUIDE - Banner Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Banner>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum BannerStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type BannerSearchParams = Pick<Banner, 'name' | 'status'>
 * - export type BannerUpdateData = Partial<Omit<Banner, 'id' | 'createdAt'>>
 */

export interface Banner {
  heading: string;
  subheading: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  heroImage: string;
  heroImageAlt: string;
}

export interface BannerFormData {
  heading: string;
  subheading: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  heroImage: string;
  heroImageAlt: string;
}