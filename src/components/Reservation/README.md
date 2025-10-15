# Reservation Components

A modular, well-tested reservation system for Le Chandelier restaurant built with React, Next.js, and TypeScript.

## Overview

This module provides a complete reservation form with custom barrel-style picker components for selecting guests, dates, and times. All components follow React and Next.js best practices with comprehensive test coverage.

## Components

### Main Components

#### `ReservationSection`
The main orchestration component that manages form state and renders the complete reservation interface.

**Features:**
- Form state management
- Input validation
- Callback handlers for all form actions
- Decorative heading and subtitle

#### `ReservationForm`
The form component containing all input fields and barrel pickers.

**Props:**
```typescript
{
  formData: ReservationFormData;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (guests: number) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}
```

### Barrel Picker Components

#### `BarrelGuestPicker`
Scrollable picker for selecting number of guests (1-20).

**Props:**
```typescript
{
  value: number;
  onChange: (guests: number) => void;
}
```

#### `BarrelDatePicker`
Date selection with 60-day range starting from today.

**Props:**
```typescript
{
  value: string;
  onChange: (date: string) => void;
}
```

**Date Format:** YYYY-MM-DD

#### `BarrelTimePicker`
Dual barrel picker for selecting hours (18-22) and minutes (00, 15, 30, 45).

**Props:**
```typescript
{
  value: string;
  onChange: (time: string) => void;
}
```

**Time Format:** HH:MM

### UI Components

#### `BarrelContainer`
Reusable wrapper component for barrel pickers with label and styling.

#### `ScrollableBarrel`
Scrollable container with 3D perspective effect, gradients, and selection highlights.

### Custom Hooks

#### `useBarrelScroll`
Custom hook encapsulating barrel scroll logic.

**Parameters:**
```typescript
{
  items: T[];
  onChange: (value: T) => void;
  itemHeight?: number;
  initialIndex?: number;
}
```

**Returns:**
```typescript
{
  scrollRef: RefObject<HTMLDivElement>;
  isScrolling: boolean;
  getItemStyle: (container: HTMLDivElement | null, index: number) => BarrelStyle;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  itemHeight: number;
}
```

## File Structure

```
Reservation/
├── __tests__/              # Test files
│   ├── useBarrelScroll.test.ts
│   ├── BarrelContainer.test.tsx
│   ├── BarrelGuestPicker.test.tsx
│   ├── BarrelDatePicker.test.tsx
│   ├── BarrelTimePicker.test.tsx
│   ├── ReservationForm.test.tsx
│   └── ReservationSection.test.tsx
├── types.ts                # TypeScript interfaces
├── useBarrelScroll.ts      # Custom hook
├── BarrelContainer.tsx     # UI wrapper components
├── BarrelGuestPicker.tsx   # Guest picker
├── BarrelDatePicker.tsx    # Date picker
├── BarrelTimePicker.tsx    # Time picker
├── ReservationForm.tsx     # Form component
├── index.ts                # Barrel exports
└── README.md               # This file
```

## Usage

```tsx
import ReservationSection from '@/components/ReservationSection';

export default function ReservationPage() {
  return <ReservationSection />;
}
```

Or import individual components:

```tsx
import { BarrelGuestPicker, BarrelDatePicker } from '@/components/Reservation';

function MyComponent() {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2025-10-15');

  return (
    <>
      <BarrelGuestPicker value={guests} onChange={setGuests} />
      <BarrelDatePicker value={date} onChange={setDate} />
    </>
  );
}
```

## Testing

All components have comprehensive test coverage (93.63% overall).

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- **BarrelContainer**: 100%
- **ReservationForm**: 100%
- **BarrelGuestPicker**: 100% (statements)
- **BarrelDatePicker**: 100% (statements)
- **BarrelTimePicker**: 100% (statements)
- **useBarrelScroll**: 97.05%
- **ReservationSection**: 91.66%

### Test Suites

1. **useBarrelScroll.test.ts** - Tests for custom hook
2. **BarrelContainer.test.tsx** - Tests for UI wrapper components
3. **BarrelGuestPicker.test.tsx** - Tests for guest picker
4. **BarrelDatePicker.test.tsx** - Tests for date picker
5. **BarrelTimePicker.test.tsx** - Tests for time picker
6. **ReservationForm.test.tsx** - Tests for form component
7. **ReservationSection.test.tsx** - Integration tests

## Best Practices Implemented

### React/Next.js
- ✅ Client components marked with `"use client"`
- ✅ Controlled components with value/onChange pattern
- ✅ Proper use of `useCallback` for memoization
- ✅ `useMemo` for expensive calculations
- ✅ Custom hooks for shared logic

### TypeScript
- ✅ Full type safety throughout
- ✅ Generic types for reusability
- ✅ Proper interface definitions
- ✅ No `any` types

### Code Organization
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Composition over inheritance
- ✅ Clear separation of concerns
- ✅ Small, focused components (< 110 lines)

### Performance
- ✅ Memoized callbacks
- ✅ Memoized expensive calculations
- ✅ Debounced scroll handling
- ✅ Efficient re-rendering

### Testing
- ✅ Unit tests for all components
- ✅ Integration tests for main component
- ✅ High test coverage (>90%)
- ✅ Testing user interactions
- ✅ Testing edge cases

## Architecture Benefits

### Before Refactoring
- 669 lines in a single file
- Duplicate scroll logic across pickers
- Difficult to test
- Hard to maintain
- Tightly coupled code

### After Refactoring
- 8 focused modules (< 110 lines each)
- Shared logic in custom hook
- 100% testable with 93.63% coverage
- Easy to maintain and extend
- Loosely coupled, reusable components

## Features

### Barrel Picker Animation
- 3D perspective effect
- Smooth scroll snapping
- Dynamic opacity and scaling
- Rotation based on position
- Gradient overlays

### Form Validation
- Required fields (name, phone, email)
- Proper input types (text, tel, email)
- HTML5 validation

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly scrolling

### Accessibility
- Semantic HTML
- Keyboard navigation support
- Touch gesture support
- Clear labels and placeholders

## Future Enhancements

Potential improvements:
- Add form validation messages
- Implement server-side submission
- Add loading states
- Add success/error notifications
- Add date availability checking
- Add time slot availability
- Add special occasion options
- Add dietary preferences
- Add localization support

## License

Part of Le Chandelier Restaurant website.

