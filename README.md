# Yoafsana Radio

A modern, responsive radio streaming application built with React, TypeScript, and Vite. Features a clean UI with dark/light theme support, favorites management, and Progressive Web App (PWA) capabilities for mobile installation.

## Features

- 🎵 Stream radio stations from various sources
- 📱 Progressive Web App (PWA) - Install on mobile devices
- 🌙 Dark/Light theme support
- ⭐ Favorites management with local storage
- 🔍 Search and filter stations
- 📊 Station statistics and information
- 🎛️ Audio controls with volume and playback
- 📱 Responsive design for all devices
- ⚡ Fast loading with Vite

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/yoafsana-radio.git
cd yoafsana-radio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Mobile Installation

This app is a Progressive Web App (PWA) and can be installed on mobile devices:

### Android (Chrome)
1. Open the app in Chrome browser
2. Tap the menu button (three dots) in the top right
3. Select "Add to Home screen"
4. Follow the prompts to install

### iOS (Safari)
1. Open the app in Safari browser
2. Tap the share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Follow the prompts to install

### Desktop (Chrome/Edge)
1. Open the app in Chrome or Edge browser
2. Click the install button in the address bar or menu
3. Follow the prompts to install

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. Push your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy the app
3. Your app will be available at `https://your-username.github.io/your-repo-name/`

**Note**: If your repository name is not at the root of your GitHub Pages, update the `base` in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
```

### Manual Deployment

You can also deploy the `dist` folder to any static hosting service like:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin
- **Animation**: Framer Motion

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── controls/       # Audio control components
│   ├── display/        # Display components
│   ├── favorites/      # Favorites related components
│   ├── providers/      # Context providers
│   └── settings/       # Settings components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API
├── store/              # State management
├── types/              # TypeScript type definitions
└── config/             # Configuration files
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Radio station data provided by [Radio Browser API](https://www.radio-browser.info/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)