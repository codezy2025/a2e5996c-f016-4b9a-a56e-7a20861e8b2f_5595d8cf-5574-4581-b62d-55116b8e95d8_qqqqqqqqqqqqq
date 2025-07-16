/**
 * 🏗️  DEVELOPMENT GUIDE - Testimonials Form Component
 * 
 * 📋 Original Requirements: ### Module-Level Documentation: Testimonials Module  

---

#### **1. Module Name & Overview**  
- **Module Name**: Testimonials  
- **Summary**: Manages the display of customer testimonials to build social proof and credibility. Renders testimonial cards in a responsive grid layout.  
- **Business Context**: Enhances user trust by showcasing verified customer experiences. Part of the salon's marketing strategy.  
- **Owner**: Frontend Team (Beauty Salon Development)  

---

#### **2. Public Interfaces / APIs**  
**Exported Components**:  
1. `Testimonials` (Container):  
   - **Props**: None (hardcoded data; future: `testimonialsData` array)  
   - **Renders**: Section header and `Testimonial` child components.  
2. `Testimonial` (Card):  
   - **Props**: None (hardcoded; future: `author`, `text`, `image`, `rating`).  

**Example Usage**:  
```jsx
// App.js
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div>
      <Testimonials /> {/* Renders testimonial section */}
    </div>
  );
}
```

---

#### **3. Dependencies**  
**Internal Dependencies**:  
- `Testimonial` component (individual cards).  
- Assets (images) from `../../../assets/Image_Icon/Image/`.  

**External Libraries**:  
- React (v18.2.0)  
- Tailwind CSS (v3.1.8)  
- DaisyUI (v2.22.0) for star ratings.  

```mermaid
graph LR
  A[Testimonials] --> B[Testimonial]
  B --> C[DaisyUI]
  B --> D[Tailwind CSS]
```

---

#### **4. Configuration**  
No environment variables or external configs. Uses Tailwind classes for styling:  
```css
/* Responsive grid */
grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-10
/* Text alignment */
lg:text-start md:text-start text-center
```

---

#### **5. Data Models / Schema**  
**Database Table**: `testimonials`  
| Field | Type | Description |  
|-------|------|-------------|  
| `id` | INT | Primary key |  
| `customer_name` | VARCHAR(100) | Author's name |  
| `customer_position` | VARCHAR(100) | Author's job title |  
| `customer_company` | VARCHAR(100) | Company name |  
| `testimonial_text` | TEXT | Feedback content |  
| `rating` | TINYINT | Star rating (1-5) |  
| `customer_image` | VARCHAR(255) | Path to profile image |  

```mermaid
erDiagram
  testimonials {
    INT id PK
    VARCHAR(100) customer_name
    VARCHAR(100) customer_position
    VARCHAR(100) customer_company
    TEXT testimonial_text
    TINYINT rating
    VARCHAR(255) customer_image
  }
```

---

#### **6. Workflow & Logic**  
**Operations**:  
1. **Render Section**:  
   - Display "Testimonials" header.  
   - Generate responsive grid of testimonial cards.  
2. **Card Population**:  
   - For each testimonial: show image, name, position, company, text, and star rating.  

**Business Rules**:  
- Ratings capped at 5 stars.  
- Mobile: Center-align text; Desktop: Left-align.  

```mermaid
flowchart TD
  A[Render Section Header] --> B[Loop Testimonials]
  B --> C[Render Image]
  B --> D[Render Name/Position]
  B --> E[Render Text]
  B --> F[Render Star Rating]
```

---

#### **7. Sequence & Interaction Flow**  
**Component Hierarchy**:  
```mermaid
sequenceDiagram
  App->>Testimonials: Render
  Testimonials->>Testimonial: Render 3x cards
  Testimonial-->>Testimonials: Return JSX
```

---

#### **8. Error Handling**  
- **Image Load Failures**: `alt` text displayed.  
- **Missing Data**: Hardcoded fallbacks (e.g., "CEO, Manpol").  
- **Rating Validation**: Fixed 5-star output (no runtime checks).  

---

#### **9. Security Considerations**  
- No auth required (public data).  
- Images: Sanitize paths to prevent path traversal.  
- No PII displayed (only provided customer names).  

---

#### **10. Testing**  
**Test Cases**:  
1. Render `Testimonials` and verify header exists.  
2. Check if 3 `Testimonial` cards appear.  
3. Validate star ratings show 5 stars.  
4. Responsive test: Grid collapses on mobile.  

**Run Tests**:  
```bash
npm test Testimonials.test.js
```

---

#### **11. Logging & Observability**  
- No explicit logging.  
- **Monitoring**: Track section visibility via Google Analytics.  

---

#### **12. Performance**  
- **Optimizations**:  
  - Local image imports prevent external fetches.  
  - Tailwind purges unused CSS.  
- **Constraints**:  
  - Hardcoded data limits scalability.  

---

#### **13. How to Extend or Modify**  
**Add Dynamic Data**:  
1. Fetch testimonials from API:  
```jsx
const [testimonials, setTestimonials] = useState([]);
useEffect(() => fetch('/api/testimonials').then(setTestimonials), []);
```  
2. Pass props to `Testimonial`:  
```jsx
<Testimonial 
  author={testimonial.customer_name}
  text={testimonial.testimonial_text}
/>
```  

**Key TODOs**:  
- Replace hardcoded data with API integration.  
- Add pagination for >3 testimonials.  

---

#### **14. Versioning & Change Log**  
| Version | Date       | Changes                |  
|---------|------------|------------------------|  
| v1.0    | 2023-10-15 | Initial hardcoded impl |  
| v1.1    | Future     | Dynamic data support   |  

---

#### **15. Mermaid Diagram Summary**  
| Diagram Type          | Description                            |  
|-----------------------|----------------------------------------|  
| **Dependencies**      | `graph LR`: Component/library deps     |  
| **Data Model**        | `erDiagram`: Testimonials table schema |  
| **Workflow**          | `flowchart TD`: Rendering logic        |  
| **Sequence Flow**     | `sequenceDiagram`: Component hierarchy |
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
 * - initialData?: Partial<Testimonials> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import { useForm } from 'react-hook-form';
import { TestimonialFormData } from '../types/TestimonialsTypes';

interface TestimonialsFormProps {
  onSubmit: (data: TestimonialFormData) => void;
}

const TestimonialsForm: React.FC<TestimonialsFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TestimonialFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          id="customer_name"
          type="text"
          {...register('customer_name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.customer_name && (
          <p className="mt-2 text-sm text-red-600">{errors.customer_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="customer_position" className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <input
          id="customer_position"
          type="text"
          {...register('customer_position', { required: 'Position is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.customer_position && (
          <p className="mt-2 text-sm text-red-600">{errors.customer_position.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="customer_company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          id="customer_company"
          type="text"
          {...register('customer_company', { required: 'Company is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.customer_company && (
          <p className="mt-2 text-sm text-red-600">{errors.customer_company.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="testimonial_text" className="block text-sm font-medium text-gray-700">
          Testimonial Text
        </label>
        <textarea
          id="testimonial_text"
          rows={4}
          {...register('testimonial_text', { required: 'Testimonial text is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.testimonial_text && (
          <p className="mt-2 text-sm text-red-600">{errors.testimonial_text.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating (1-5)
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          {...register('rating', { 
            required: 'Rating is required',
            min: { value: 1, message: 'Minimum rating is 1' },
            max: { value: 5, message: 'Maximum rating is 5' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.rating && (
          <p className="mt-2 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="customer_image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          id="customer_image"
          type="text"
          {...register('customer_image', { required: 'Image URL is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.customer_image && (
          <p className="mt-2 text-sm text-red-600">{errors.customer_image.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default TestimonialsForm;