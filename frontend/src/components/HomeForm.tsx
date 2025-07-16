/**
 * 🏗️  DEVELOPMENT GUIDE - Home Form Component
 * 
 * 📋 Original Requirements: ### Module Documentation: Home Module

---

#### 1. Module Name & Overview
- **Module Name**: `Home`  
- **Summary**: Primary landing page composing all UI sections for the beauty salon website.  
- **Business Context**: Digital storefront showcasing services, testimonials, and appointment booking.  
- **Owner**: Frontend Development Team  

---

#### 2. Public Interfaces / APIs
**Exported Component**:  
```jsx
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Banner />
      <Services />
      <Testimonials />
      <Advertise />
      <Contact />
      <Footer />
    </div>
  )
}
```

**Usage in App.js**:  
```jsx
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
```

---

#### 3. Dependencies
```mermaid
graph LR
  Home --> Navbar
  Home --> Banner
  Home --> Services
  Home --> Testimonials
  Home --> Advertise
  Home --> Contact
  Home --> Footer
  Home --> TailwindCSS
  Home --> DaisyUI
```

- **Internal Dependencies**:  
  `Navbar`, `Banner`, `Services`, `Testimonials`, `Advertise`, `Contact`, `Footer`  
- **External Libraries**:  
  React (18.2.0), Tailwind CSS (3.1.8), DaisyUI (2.22.0)  

---

#### 4. Configuration
- **Tailwind Theme** (`tailwind.config.js`):  
  ```js
  module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          salonPink: '#FF9FF3',
          salonPurple: '#8E44AD'
        }
      }
    },
    plugins: [require("daisyui")]
  }
  ```
- **No environment variables required**

---

#### 5. Data Models / Schema
**Data Sources via Child Components**:  
```mermaid
erDiagram
  SERVICES ||--o{ HOME : displays
  TESTIMONIALS ||--o{ HOME : displays
  SERVICES {
    INT id PK
    VARCHAR(255) title
    TEXT description
    DECIMAL price
  }
  TESTIMONIALS {
    INT id PK
    VARCHAR(100) customer_name
    TEXT testimonial_text
  }
```

---

#### 6. Workflow & Logic
```mermaid
flowchart TD
  A[Render Navbar] --> B[Show Banner]
  B --> C[Display Services]
  C --> D[Show Testimonials]
  D --> E[Render Advertise]
  E --> F[Display Contact]
  F --> G[Render Footer]
```

- **Business Rules**:  
  - Mobile-first responsive layout  
  - Services displayed in price-ascending order  
  - Only featured testimonials shown  

---

#### 7. Sequence & Interaction Flow
```mermaid
sequenceDiagram
  participant User
  participant Browser
  participant Home
  participant ChildComponents
  
  User->>Browser: Access root URL
  Browser->>Home: Mount component
  Home->>ChildComponents: Render Banner/Services/Testimonials/etc
  ChildComponents-->>Home: Return rendered content
  Home-->>Browser: Complete page assembly
  Browser-->>User: Display homepage
```

---

#### 8. Error Handling
- **Fallbacks**:  
  - Empty state placeholders for missing data  
  - Error boundaries for child component failures  
- **No retry logic** (static content)  

---

#### 9. Security Considerations
- No authentication requirements (public page)  
- XSS protection via React DOM sanitization  
- CSP enforced via Vercel headers  

---

#### 10. Testing
**Test Cases**:  
```jsx
import { render, screen } from '@testing-library/react'
import Home from './Home'

test('renders all sections', () => {
  render(<Home />)
  expect(screen.getByTestId('banner')).toBeInTheDocument()
  expect(screen.getByText(/Our Services/i)).toBeInTheDocument()
})
```
**Coverage**: 85% (via Jest)  
**Run Tests**: `npm test Home.test.js`  

---

#### 11. Logging & Observability
- **Logs**:  
  - Component mount/unmount events (debug level)  
- **Metrics**:  
  - Page load timing (Web Vitals)  
  - Section visibility (Intersection Observer)  

---

#### 12. Performance
- **Bundle Size**: 45 KB (gzipped)  
- **Optimizations**:  
  - Lazy-loaded images  
  - CSS purging via Tailwind  
- **LCP**: < 1.5s (target)  

---

#### 13. How to Extend or Modify
**Add New Section**:  
1. Create component in `/src/components`  
2. Import in `Home.js`  
3. Insert in render hierarchy:
```jsx
<Testimonials />
{/* New Component Here */}
<Advertise />
```

**Modify Layout**:  
- Adjust Tailwind classes in main container  
- Reorder component sequence  

---

#### 14. Versioning & Change Log
| Version | Date       | Changes                     |
|---------|------------|-----------------------------|
| 1.2.0   | 2023-11-15 | Added Advertise section     |
| 1.1.0   | 2023-09-20 | Responsive layout overhaul  |
| 1.0.0   | 2023-07-10 | Initial release             |

---

#### 15. Mermaid Diagram Summary
| Diagram Type          | Mermaid      | Description                          |
|-----------------------|--------------|--------------------------------------|
| Dependencies          | graph LR     | Component/library relationships     |
| Data Flow             | erDiagram    | Database entities used              |
| Workflow              | flowchart TD | Page rendering sequence             |
| Interactions          | sequenceDiagram | Page load lifecycle                |

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
 * - initialData?: Partial<Home> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { useForm } from 'react-hook-form';
import type { HomeFormData } from '../types/HomeTypes';

interface HomeFormProps {
  onSubmit: (data: HomeFormData) => void;
}

const HomeForm = ({ onSubmit }: HomeFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<HomeFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium">Service</label>
        <select
          id="service"
          {...register('service', { required: 'Service selection is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select a service</option>
          <option value="haircut">Haircut</option>
          <option value="coloring">Coloring</option>
          <option value="styling">Styling</option>
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-salonPurple hover:bg-salonPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-salonPink"
      >
        Submit
      </button>
    </form>
  );
};

export default HomeForm;