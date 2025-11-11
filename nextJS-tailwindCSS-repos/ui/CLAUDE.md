# shadcn/ui - Copy-Paste Component Architecture

**Official Site**: https://ui.shadcn.com
**GitHub**: https://github.com/shadcn-ui/ui
**Type**: Copy-paste component framework
**Author**: shadcn (https://twitter.com/shadcn)
**License**: MIT
**Philosophy**: Own your components, not a dependency

---

## 🎯 What is shadcn/ui?

shadcn/ui is **not a component library** - it's a collection of re-usable components that you can copy and paste into your apps. It's **accessible, customizable, and open source**, built on Radix UI primitives and styled with Tailwind CSS.

### Revolutionary Philosophy

> "This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps." - shadcn

**Core Principles**:
- **Copy, Don't Install**: Copy source code directly into your project
- **Full Ownership**: You own and control the component code
- **Zero Runtime**: No component library dependency
- **Complete Customization**: Modify components to fit your exact needs
- **Accessibility First**: Built on Radix UI for WCAG compliance

**Why This Approach?**

1. **No Black Box**: See and modify every line of component code
2. **No Breaking Changes**: Updates are opt-in, you control everything
3. **Perfect Customization**: Adapt components to your exact design system
4. **Tree-Shakeable**: Only bundle what you actually use
5. **Learning Tool**: Understand how components work by reading source

---

## ✨ Complete Feature Set

### 1. Architecture & Technology

**Foundation**:
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **TypeScript**: Full type safety and IntelliSense
- **React**: 18.2+ with hooks and modern patterns
- **Next.js**: Optimized for Next.js 13+ (App Router)

**Build System**:
- **Turbo**: Monorepo build orchestration
- **pnpm**: Fast, efficient package management
- **Workspaces**: Modular project organization

**Quality Tools**:
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework
- **Puppeteer**: E2E testing and screenshots

---

### 2. Component Catalog (40+ Components)

### Core UI Components

**Buttons & Actions**:
- **Button**: Primary, secondary, outline, ghost, link variants with sizes and states
- **Toggle**: On/off state toggle button
- **Toggle Group**: Exclusive or multi-select toggle sets

**Form Components**:
- **Input**: Text input with variants
- **Textarea**: Multi-line text input
- **Select**: Custom select dropdown
- **Checkbox**: Accessible checkbox input
- **Radio Group**: Radio button selection
- **Switch**: Toggle switch control
- **Slider**: Range input slider
- **Label**: Form field labels
- **Form**: Form management with validation

**Navigation**:
- **Navigation Menu**: Horizontal navigation with dropdowns
- **Menubar**: Desktop menu bar
- **Tabs**: Tab-based navigation
- **Breadcrumb**: Navigation breadcrumbs
- **Pagination**: Page navigation controls
- **Command**: Command palette / ⌘K menu

**Layout Components**:
- **Card**: Content container with header/body/footer
- **Separator**: Visual divider (horizontal/vertical)
- **Aspect Ratio**: Maintain aspect ratios
- **Resizable**: Resizable panels and layouts
- **Scroll Area**: Custom scrollbar container

### Overlay Components

**Dialogs & Modals**:
- **Dialog**: Modal dialog with backdrop
- **Alert Dialog**: Confirmation dialog
- **Sheet**: Slide-in panel (drawer)
- **Drawer**: Mobile-optimized drawer

**Dropdowns & Popovers**:
- **Dropdown Menu**: Context menus and actions
- **Popover**: Floating content container
- **Hover Card**: Hover-triggered content
- **Tooltip**: Contextual tooltips
- **Context Menu**: Right-click context menu

### Feedback Components

**Notifications**:
- **Toast**: Notification toasts with queue management
- **Alert**: Inline alert messages
- **Sonner**: Advanced toast system integration

**Display Elements**:
- **Badge**: Status indicators and labels
- **Avatar**: User profile images with fallback
- **Progress**: Loading progress indicator
- **Skeleton**: Loading placeholders
- **Spinner**: Loading spinners

### Data Display

**Tables & Lists**:
- **Table**: Data tables with sorting
- **Data Table**: Advanced table with filtering, sorting, pagination
- **Accordion**: Collapsible content sections
- **Collapsible**: Expandable content

**Interactive Elements**:
- **Calendar**: Date picker calendar
- **Date Picker**: Date selection component
- **Carousel**: Image/content slider
- **Chart**: Data visualization components

### Advanced Components

**Specialized**:
- **Combobox**: Searchable select with autocomplete
- **Command**: Command palette with search
- **Sonner**: Toast notifications
- **Input OTP**: One-time password input

---

### 3. CLI Tool - Component Installation

**CLI Features**:
```bash
# Initialize project
npx shadcn@latest init

# Add individual components
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form

# Add multiple components
npx shadcn@latest add button dialog form

# Diff changes before applying
npx shadcn@latest diff button

# Update components
npx shadcn@latest update
```

**What the CLI Does**:
1. Creates `/components/ui/` directory
2. Copies component source files
3. Installs required dependencies
4. Configures Tailwind CSS
5. Sets up path aliases (@/components)
6. Updates package.json

**Configuration** (`components.json`):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

---

### 4. Registry System

**Multiple Registry Versions**:

**v3 Registry** (Stable):
- Production-ready components
- Tailwind CSS v3 compatible
- Widely tested and used

**v4 Registry** (Latest):
- Next-generation components
- Tailwind CSS v4 support
- New component features

**Component Registry Structure**:
```json
{
  "name": "button",
  "type": "registry:ui",
  "dependencies": ["class-variance-authority"],
  "files": [
    {
      "path": "ui/button.tsx",
      "type": "registry:ui"
    }
  ]
}
```

---

### 5. Theming System

**CSS Variables**:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode values */
  }
}
```

**Color Presets**:
- Slate (default)
- Gray
- Zinc
- Neutral
- Stone
- Red
- Rose
- Orange
- Green
- Blue
- Yellow
- Violet

**Customization**:
```bash
# Change base color
npx shadcn@latest init

# Interactive prompt to select color
```

---

## 📖 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- React 18+ project
- Tailwind CSS configured
- TypeScript (optional but recommended)

### Quick Start

**1. Initialize shadcn/ui**:
```bash
npx shadcn@latest init
```

**Interactive Setup**:
- Choose style (Default, New York)
- Select base color
- Configure CSS variables
- Set up path aliases

**2. Add Components**:
```bash
# Add button component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button dialog form input label
```

**3. Use Components**:
```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}
```

### Manual Installation

**1. Install Dependencies**:
```bash
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge
```

**2. Configure Tailwind**:
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... more colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

**3. Add CSS Variables**:
```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... all variables */
  }
}
```

**4. Copy Component Source**:
- Visit https://ui.shadcn.com/docs/components/[component]
- Click "View code"
- Copy into `components/ui/[component].tsx`

---

## 🚀 Usage Examples

### Basic Components

**Button Variants**:
```tsx
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  )
}
```

### Form Example

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Dialog Example

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

### Data Table Example

```tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

export default function DataTableDemo() {
  const data: Payment[] = [/* ... */]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

---

## 🎨 Customization

### Modifying Components

**1. Find Component File**:
```
components/ui/button.tsx
```

**2. Modify Source**:
```tsx
// Add new variant
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        // ... existing variants
        custom: "bg-purple-500 text-white hover:bg-purple-600",
      },
    },
  }
)
```

**3. Use New Variant**:
```tsx
<Button variant="custom">Custom Button</Button>
```

### Creating Custom Components

```tsx
// components/ui/my-component.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva(
  "rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

---

## 🏗 Project Structure

```
your-project/
├── components/
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── form.tsx
│       └── ...
├── lib/
│   └── utils.ts                 # Utility functions
├── app/                         # Next.js App Router
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components.json             # shadcn/ui config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
└── package.json               # Dependencies
```

---

## 🆚 shadcn/ui vs Traditional Libraries

| Aspect | shadcn/ui | Material-UI | Chakra UI | Ant Design |
|--------|-----------|-------------|-----------|------------|
| **Installation** | Copy-paste source | npm install | npm install | npm install |
| **Ownership** | You own code | Black box | Black box | Black box |
| **Customization** | Full control | Theme-based | Theme-based | Theme-based |
| **Updates** | Opt-in | Breaking changes | Breaking changes | Breaking changes |
| **Bundle Size** | Only what you use | Full library | Full library | Large |
| **Learning Curve** | Medium | Medium-High | Medium | Medium-High |
| **TypeScript** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Accessibility** | ✅ Radix-based | ✅ Yes | ✅ Yes | ✅ Yes |
| **Best For** | Custom systems | Enterprise apps | Flexibility | Enterprise |

---

## ♿ Accessibility

### Built on Radix UI

**WCAG 2.1 AA Compliance**:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Proper semantics

**Example - Dialog Accessibility**:
```tsx
<Dialog>
  {/* Automatic focus trap */}
  {/* Escape key to close */}
  {/* Screen reader announcements */}
  {/* Backdrop click handling */}
  <DialogContent>
    {/* Properly labeled */}
    {/* Focus management */}
  </DialogContent>
</Dialog>
```

---

## 🎓 Best Practices

### DO

- ✅ Customize components to match your design system
- ✅ Use TypeScript for type safety
- ✅ Follow existing patterns when modifying
- ✅ Test accessibility after modifications
- ✅ Keep components isolated and reusable
- ✅ Use CSS variables for theming
- ✅ Leverage Radix UI primitives

### DON'T

- ❌ Treat it like a npm package
- ❌ Expect automatic updates
- ❌ Skip understanding the source
- ❌ Ignore accessibility features
- ❌ Modify core Radix behavior without reason
- ❌ Remove ARIA attributes
- ❌ Hardcode colors (use CSS variables)

---

## 📚 Additional Resources

### Official Resources
- **Documentation**: https://ui.shadcn.com/docs
- **Components**: https://ui.shadcn.com/docs/components
- **Examples**: https://ui.shadcn.com/examples
- **GitHub**: https://github.com/shadcn-ui/ui
- **Twitter**: @shadcn

### Learning Resources
- **Radix UI Docs**: https://www.radix-ui.com
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com
- **Zod Validation**: https://zod.dev

### Templates
- **Next.js Templates**: Pre-configured project starters
- **Dashboard Templates**: Admin dashboard examples
- **Landing Pages**: Marketing page templates

---

## 🌟 Use Cases

### 1. SaaS Dashboard
- Data tables with sorting/filtering
- Forms with validation
- Navigation menus
- Toast notifications
- Modal dialogs

### 2. E-commerce Platform
- Product cards
- Shopping cart
- Checkout forms
- Image carousels
- Review systems

### 3. Documentation Site
- Navigation sidebar
- Tabs for examples
- Code blocks
- Search command palette
- Breadcrumbs

### 4. Admin Panel
- Data management tables
- Role management forms
- Settings panels
- Analytics dashboards
- User management

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for shadcn/ui component framework
**Maintainer**: shadcn
**License**: MIT - Free for commercial use
**Philosophy**: Copy, customize, and own your components
