🕯️ Le Chandelier Restaurant Website

An elegant, modern website for **Le Chandelier**, a French-Swiss restaurant. Built with Next.js 15 and featuring a sophisticated design with neumorphic elements, custom typography, and a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)

## 📖 About

Le Chandelier is a French-Swiss restaurant website designed to provide visitors with an immersive digital experience. The site showcases the restaurant's menu, team, awards, events, and provides an easy way to make reservations and get in touch.

## ✨ Features

- 🏠 **Home Page** - Comprehensive landing page with all key sections
- 📜 **About Page** - Restaurant story, philosophy, and values
- 🍽️ **Menu Page** - Full menu with detailed offerings
- 🥂 **Drinks Section** - Wine list and beverage selection
- 🎉 **Events Page** - Special events and private dining options
- 👨‍🍳 **Team Section** - Meet the chefs and staff
- 🏆 **Awards Section** - Recognition and accolades
- 📞 **Contact Page** - Location and contact information
- 📅 **Reservation Page** - Table booking system
- 📱 **Fully Responsive** - Optimized for all devices
- 🎨 **Neumorphic Design** - Modern, elegant UI components
- ⚡ **Fast Performance** - Built with Next.js 15 and Turbopack

## 🛠️ Technology Stack

### Core
- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **Google Fonts** - Custom typography:
  - **Bodoni Moda** - Elegant serif for headings
  - **Luxurious Script** - Decorative script font
  - **Poppins** - Clean sans-serif for body text

### Build Tools
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd lechandelier-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code linting |

## 📁 Project Structure

```
lechandelier-restaurant/
├── public/                         # Static assets
│   ├── Le-Chandelier-BG.png       # Background image
│   ├── Chandelier.png             # Logo
│   ├── *.webp, *.png              # Team photos, dishes, venue images
│   └── ...
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── about/                 # About page
│   │   │   └── page.tsx
│   │   ├── contact/               # Contact page
│   │   │   └── page.tsx
│   │   ├── events/                # Events page
│   │   │   └── page.tsx
│   │   ├── menu/                  # Menu page
│   │   │   └── page.tsx
│   │   ├── reservation/           # Reservation page
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Root layout with fonts
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/                # React components
│   │   ├── About/
│   │   │   └── AboutHero.tsx
│   │   ├── Events/
│   │   │   └── EventsHero.tsx
│   │   ├── Home/
│   │   │   └── hero2.tsx
│   │   ├── Menu/
│   │   │   ├── MenuHero.tsx
│   │   │   └── MenuHero2.tsx
│   │   ├── AwardsSection.tsx
│   │   ├── BarrelPicker.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ContactSection2.tsx
│   │   ├── DrinkSection2.tsx
│   │   ├── DrinksSection.tsx
│   │   ├── DynamicNeumorphicButton.tsx
│   │   ├── EventSection2.tsx
│   │   ├── EventSection3.tsx
│   │   ├── EventsSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Hero2.tsx
│   │   ├── Hero3.tsx
│   │   ├── Menu.tsx
│   │   ├── Menu2.tsx
│   │   ├── Menu3.tsx
│   │   ├── MenuSection.tsx
│   │   ├── MenuSection2.tsx
│   │   ├── NavBar.tsx
│   │   ├── NavBar2.tsx
│   │   ├── Neumorphic-Button.tsx
│   │   ├── ReservationSection.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── TeamSection.tsx
│   │   └── WhoWeAre.tsx
│   └── lib/                       # Utilities
│       └── polymorphic-ref.ts
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## 🎨 Design Features

### Typography
- **Bodoni Moda**: Elegant serif for headings (weights: 400, 600, 800)
- **Luxurious Script**: Decorative script for accents
- **Poppins**: Modern sans-serif for body text (weights: 400, 500, 600, 700)

### UI Elements
- Neumorphic buttons and cards
- Glass morphism effects
- Smooth animations and transitions
- Backdrop blur effects
- Responsive navigation

### Color Scheme
- Sophisticated dark theme with warm accents
- Gold/bronze highlights for premium feel
- Semi-transparent overlays for depth

## 🌐 Pages Overview

### Home (`/`)
Sections include:
- Hero with background image
- Awards & Recognition
- Who We Are
- Menu Preview
- Drinks Showcase
- Events Highlights
- Team Introduction
- Contact Information

### About (`/about`)
- Restaurant history
- Philosophy and values
- Chef's story

### Menu (`/menu`)
- Full menu display
- Categories and pricing
- Dish descriptions

### Events (`/events`)
- Special events
- Private dining options
- Booking information

### Contact (`/contact`)
- Location details
- Contact form
- Operating hours
- Map integration

### Reservation (`/reservation`)
- Table booking system
- Date and time selection
- Party size options

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Laptop**: 1024px - 1439px
- **Desktop**: 1440px+

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js configuration
4. Click "Deploy"

### Other Platforms

The app can be deployed to:
- **Netlify**
- **AWS Amplify**
- **Digital Ocean App Platform**
- **Railway**
- **Render**

**Build Command**: `npm run build`  
**Start Command**: `npm start`  
**Output Directory**: `.next`

## 🔧 Configuration

### Environment Variables

If needed, create a `.env.local` file:

```bash
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://lechandelier.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
NEXT_PUBLIC_RESERVATION_API=your_reservation_api_url
```

### Next.js Config

Modify `next.config.ts` for additional configurations like:
- Image optimization
- Redirects
- Custom headers
- Internationalization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS for styling
- Follow ESLint rules

## 🐛 Known Issues

Currently no known issues. Please report bugs via GitHub Issues.

## 📈 Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Optimized images (WebP format)
- Server-side rendering for faster loads

## 📄 License

This project is proprietary and confidential.

## 📧 Contact

For questions or inquiries about Le Chandelier:
- **Website**: [Coming Soon]
- **Email**: [Your Email]
- **Phone**: [Your Phone]
- **Location**: [Your Location]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- Google Fonts for typography

---

**Built with passion for French-Swiss cuisine** 🇫🇷🇨🇭

Made with ❤️ using Next.js, React, and TypeScript
```
