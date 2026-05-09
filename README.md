# CelebEasy - Premium Home Event Management Platform

A modern, premium startup website for CelebEasy, helping people book beautiful home event setups in metro cities.

## Features

- **Modern UI/UX**: Dark theme with purple/pink/blue gradients
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion powered transitions
- **Premium Aesthetics**: Glassmorphism effects and glowing buttons
- **Fast Loading**: Optimized React + Vite setup
- **SEO Optimized**: Meta tags and semantic HTML

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React (icons)
- Vite

### Backend
- Java Spring Boot
- H2 Database
- Maven

## Project Structure

```
celebeasy/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.tsx    # Main application component
│   │   ├── main.tsx   # Entry point
│   │   └── index.css  # Global styles with Tailwind
│   ├── package.json
│   └── tailwind.config.js
├── backend/           # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
└── README.md
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the website.

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on [http://localhost:8080](http://localhost:8080).

## Sections

1. **Hero**: Eye-catching headline with CTA buttons
2. **Services**: 6 event types with pricing
3. **How It Works**: 3-step process
4. **Pricing**: 3 packages (Basic, Premium, Luxury)
5. **Gallery**: Pinterest-style image grid
6. **Why Choose Us**: 6 feature highlights
7. **Testimonials**: Customer reviews
8. **Booking Form**: Contact form with WhatsApp integration
9. **Footer**: Links and social media

## Design Philosophy

- **Premium Startup Feel**: Similar to Airbnb/Uber/Zomato
- **Instagram-Worthy**: Beautiful, viral aesthetics
- **User-Centric**: "Book in minutes" experience
- **Trust-Building**: Verified vendors, fixed pricing

## Business Model

- Home event setups for under 50 guests
- Metro city focus
- Complete service: decoration, lighting, photography, music
- Fixed pricing packages

## Future Enhancements

- User authentication
- Real-time booking system
- Payment integration
- Vendor dashboard
- Mobile app
- AI-powered recommendations

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

© 2024 CelebEasy. All rights reserved.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
