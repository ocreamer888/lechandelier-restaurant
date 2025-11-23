# Language Inconsistencies Fix Walkthrough

I have resolved the language inconsistencies on the `/es/menu` and `/en/menu` pages. The issue was caused by a mix of hardcoded text and incorrect handling of dynamic content in several components.

## Changes Made

### 1. Translation Files
Added missing translation keys for menu categories and featured drinks in `src/messages/en.json` and `src/messages/es.json`.

### 2. Menu Hero Component (`MenuHero2.tsx`)
- Replaced hardcoded English title ("Menu") and subtitle ("French-Swiss cuisine...") with localized strings.
- Replaced hardcoded Spanish card labels ("Entradas", "Platos Fuertes", etc.) with localized strings.

### 3. Food Menu Component (`Menu3.tsx` & `Menu3Wrapper.tsx`)
- Updated `Menu3Wrapper` to pass the current `locale` to the `Menu3` component.
- Updated `Menu3` to:
    - Accept the `locale` prop.
    - Dynamically switch between Spanish and English item names based on the locale.
    - Use localized labels for category buttons ("ENTRADAS" vs "STARTERS").

### 4. Drinks Section (`DrinksSectionWrapper.tsx`)
- Replaced hardcoded English section heading ("Drinks") and subtitle with localized strings using `getTranslations`.
- Added localized fallback text for the featured drink (Sangria).

### 5. Drinks Menu Component (`DrinksMenu.tsx`)
- Replaced hardcoded English category buttons ("Champagne & Sparkling", etc.) with localized strings using `useTranslations`.

## Verification Results

### Automated Checks
- **Linting**: Fixed a type error in `Menu3Wrapper.tsx` where `locale` prop was missing from `Menu3` type definition.

### Manual Verification Steps
1.  **Navigate to `/es/menu`**:
    -   **Hero**: Title should be "Menú", subtitle in Spanish. Cards should say "Entradas", "Platos Fuertes", etc.
    -   **Food Menu**: Category buttons should be "ENTRADAS", "PLATOS FUERTES", "POSTRES". Item names should be in Spanish (main) and English (subtitle).
    -   **Drinks Section**: Title should be "Bebidas". Featured drink description in Spanish.
    -   **Drinks Menu**: Category buttons should be "CHAMPAÑA Y ESPUMOSOS", etc.

2.  **Navigate to `/en/menu`**:
    -   **Hero**: Title should be "Menu", subtitle in English. Cards should say "Starters", "Main Courses", etc.
    -   **Food Menu**: Category buttons should be "STARTERS", "MAIN COURSES", "DESSERTS". Item names should be in English (main) and Spanish (subtitle).
    -   **Drinks Section**: Title should be "Drinks". Featured drink description in English.
    -   **Drinks Menu**: Category buttons should be "CHAMPAGNE & SPARKLING", etc.
