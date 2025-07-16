/**
 * 🏗️  DEVELOPMENT GUIDE - Home List Component
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

import { useTable } from 'react-table';
import { HomeItem } from '../types/HomeTypes';

interface HomeListProps {
  data: HomeItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HomeList = ({ data, onEdit, onDelete }: HomeListProps) => {
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row.original.id)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border-collapse">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="p-2 border-b text-left">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="p-2 border-b">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HomeList;