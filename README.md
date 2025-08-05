# AdBrand Dashboard

A modern, clean, and extensible dashboard built with [Next.js](https://nextjs.org) and TypeScript. This project features optimized, human-friendly code, improved navigation, and a focus on maintainability and usability.

## Features

- **Next.js + TypeScript**: Fast, scalable, and type-safe.
- **Dashboard Structure**: Organized under `/dashboard` with Overview, Reporting, and Settings pages.
- **Navigation**: Sidebar and mobile drawer with active route highlighting.
- **Overview Page**: Metrics, charts, filters, and a data table—cleaned up for readability and maintainability.
- **Reusable Skeleton Loader**: For loading states in cards, charts, and tables (`src/components/ui/Skeleton.tsx`).
- **Animated Placeholders**: "Coming Soon" for Reporting and Settings pages.
- **Tailwind CSS**: For rapid, consistent styling.
- **Lucide Icons**: Modern icon set for navigation and UI elements.

## Folder Structure

```
/src
  /app
    /dashboard
      /overview
      /reporting
      /setting
  /components
    /navigation
    /layout
    /table
    /ui
```

## Development

1. **Install dependencies**
   ```bash
   npm install
   # or
yarn install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   # or
yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Code Style & Principles

- Clean, readable, and maintainable TypeScript/React code.
- Clear naming, concise comments, and logical grouping of related logic.
- Avoid unnecessary complexity and over-typing.
- Consistent formatting with Prettier.

## Future Improvements

- Replace "Coming Soon" placeholders with real features for Reporting and Settings.
- Add real data fetching and API integration.
- Extract large UI blocks into reusable components or custom hooks.
- Add unit and integration tests.
- Improve accessibility (ARIA, keyboard navigation).
- Add user authentication and profile features.

---

Inspired by best practices in modern React/Next.js dashboard development.

