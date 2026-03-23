# AGENTS.md - ISEI Ingeniería Landing Page

## Project Overview

This is a professional landing page for ISEI Ingeniería, an industrial electrical engineering company based in Santa Fe, Argentina. The site showcases their services in electrical systems diagnosis, design, and execution for industrial facilities.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Next.js optimized fonts (Inter, Poppins)

## Commands

### Development
```bash
npm run dev
```
Runs the development server at http://localhost:3000

### Build
```bash
npm run build
```
Creates an optimized production build

### Start
```bash
npm start
```
Starts the production server

### Lint
```bash
npm run lint
```
Runs ESLint for code quality

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Contact form API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with SEO metadata
│   ├── page.tsx               # Main landing page
│   ├── robots.ts              # Robots.txt configuration
│   └── sitemap.ts             # Dynamic sitemap
├── components/
│   ├── Header.tsx             # Fixed header with blur on scroll
│   ├── Footer.tsx             # Site footer
│   ├── Hero.tsx               # Hero with animated particles
│   ├── Problems.tsx           # Problem cards section
│   ├── About.tsx              # About company section
│   ├── Differentials.tsx      # Why choose us section
│   ├── Method.tsx             # 3-step visual process
│   ├── Benefits.tsx           # Results/benefits section
│   ├── Contact.tsx            # Contact form section
│   └── WhatsAppButton.tsx     # Floating WhatsApp button
├── lib/
│   └── utils.ts               # Utility functions (cn)
├── public/
│   └── images/                # Static images
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Code Style Guidelines

### TypeScript
- Use explicit types for all function parameters and return values
- Prefer `interface` for object types, `type` for unions/intersections
- Avoid `any` - use `unknown` when type is unclear

### React Components
- Use `"use client"` directive only when needed (interactive components)
- Server Components by default for static content
- Use named exports for components

### Tailwind CSS
- Use semantic color tokens from config (`primary-600`, `accent-cyan`, etc.)
- Extract repeated patterns into component classes
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for mobile-first design

### File Organization
- One component per file
- Co-locate related files (component, tests if any)
- Use absolute imports with `@/` prefix

### SEO Best Practices
- All images must have descriptive alt text
- Use semantic HTML elements (nav, main, section, article)
- Maintain heading hierarchy (single H1 per page)
- Metadata is configured in `app/layout.tsx`

## Design System

### Colors
- Primary: `primary-*` (blue tones)
- Dark: `dark-*` (dark backgrounds)
- Accent: `accent-cyan` / `accent-blue` (highlights)
- Neutrals: `gray-*` (text and backgrounds)

### Typography
- Headings: `font-heading` (Poppins)
- Body: `font-sans` (Inter)
- Scale: 3xl-7xl for hero/titles, lg-xl for body

### Spacing
- Container: `container mx-auto` with responsive padding
- Sections: `py-24` vertical padding
- Cards: `p-6` to `p-8` padding

## Animation Guidelines

- Use Framer Motion for component animations
- Keep animations subtle - prefer `opacity` and `y` transforms
- Use `whileInView` for scroll-triggered animations
- `viewport={{ once: true }}` to avoid re-animating
- Stagger children with `staggerChildren: 0.1`

## Contact Form

The contact form submits to `/api/contact` via POST request with JSON body:
```json
{
  "nombre": "string",
  "email": "string",
  "telefono": "string (optional)",
  "empresa": "string",
  "mensaje": "string"
}
```

## Deployment

The project is configured for Vercel deployment:
- Automatic builds on push
- Environment variables for production
- Edge-ready configuration

## SEO Checklist

- [x] Title and meta description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org structured data (ProfessionalService)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Semantic HTML
- [x] Alt text on images
- [x] Canonical URLs

## Performance Targets

- Lighthouse Performance: 90+
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
