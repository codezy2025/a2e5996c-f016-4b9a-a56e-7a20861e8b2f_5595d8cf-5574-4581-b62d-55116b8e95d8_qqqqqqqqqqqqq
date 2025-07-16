/**
 * 🏗️  DEVELOPMENT GUIDE - Testimonials Page Component
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
import TestimonialsForm from '../components/TestimonialsForm';
import TestimonialsList from '../components/TestimonialsList';
import testimonialsService from '../services/testimonialsService';
import { Testimonial } from '../types/TestimonialsTypes';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsService.getAll();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (testimonial: Testimonial) => {
    try {
      if (editingTestimonial) {
        const updatedTestimonial = await testimonialsService.update(testimonial);
        setTestimonials(testimonials.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t));
      } else {
        const newTestimonial = await testimonialsService.create(testimonial);
        setTestimonials([...testimonials, newTestimonial]);
      }
      setEditingTestimonial(null);
    } catch (err) {
      setError('Failed to save testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await testimonialsService.delete(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
  };

  return (
    <div className="testimonials-page">
      <h1>Testimonials</h1>
      {error && <div className="error">{error}</div>}
      <TestimonialsForm 
        onSubmit={handleSubmit} 
        testimonial={editingTestimonial} 
        onCancel={() => setEditingTestimonial(null)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TestimonialsList 
          testimonials={testimonials} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default TestimonialsPage;