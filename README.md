# 🥷 AnimeNota - Anime Character Explorer

A high-performance, modern web application for exploring anime characters with an interactive Naruto-themed chatbot. Built with Next.js 13, TypeScript, and Framer Motion.

## ✨ Features

### 🎯 Core Features
- **Character Search**: Find any anime character with lightning-fast search
- **Interactive Chatbot**: Chat with Naruto Uzumaki about anime characters and get motivation
- **Character Profiles**: Detailed information about characters from popular anime series
- **Quote Generator**: Discover inspiring quotes from legendary anime characters
- **Responsive Design**: Beautiful UI that works on all devices

### 🚀 Performance Optimizations
- **Lazy Loading**: Components load only when needed
- **Memoized Calculations**: Expensive operations are cached with `useMemo`
- **Optimized Animations**: Reduced animation complexity for better performance
- **Image Optimization**: Next.js automatic image optimization
- **CSS Optimization**: Critical CSS inlining and optimization
- **Bundle Splitting**: Automatic code splitting for faster loading

### 🎨 UI/UX Features
- **Naruto Theme**: Beautiful orange and red gradient design
- **Smooth Animations**: Framer Motion powered animations
- **Interactive Elements**: Hover effects and micro-interactions
- **Accessibility**: Proper focus states and reduced motion support
- **Mobile Optimized**: Touch-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Performance**: Next.js optimizations + custom optimizations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
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

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🎮 Usage

### Main Features

1. **Landing Page**: 
   - Beautiful animated hero section
   - Feature overview with interactive cards
   - Call-to-action buttons for exploration

2. **Character Search**:
   - Search for any anime character
   - Filter by anime series
   - View detailed character information

3. **Naruto Chatbot**:
   - Click the chat button in the bottom-right corner
   - Ask about anime characters, get motivation, or just chat
   - Naruto responds with his signature "dattebayo!" style

4. **Character Exploration**:
   - Browse characters by anime series
   - View character abilities and quotes
   - Learn about character backgrounds

### Chatbot Commands

The Naruto chatbot can help you with:
- **Character Information**: "Tell me about Goku" or "Who is Sasuke?"
- **Motivation**: "I need motivation" or "Give me encouragement"
- **Friendship**: "Tell me about friendship" or "What about bonds?"
- **Dreams**: "What about dreams?" or "Tell me about goals"
- **Training**: "How to get stronger?" or "Training advice"
- **Food**: "What about ramen?" or "Favorite food"

## 🚀 Performance Features

### Optimizations Implemented

1. **Component Optimization**:
   - Lazy loading for heavy components
   - Memoized expensive calculations
   - Reduced re-renders with `useCallback`

2. **Animation Optimization**:
   - Reduced animation complexity
   - Fewer simultaneous animations
   - Respects `prefers-reduced-motion`

3. **Bundle Optimization**:
   - Tree shaking for unused code
   - Dynamic imports for large components
   - Optimized package imports

4. **CSS Optimization**:
   - Critical CSS inlining
   - Optimized animations
   - Mobile-first responsive design

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 📁 Project Structure

```
project/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── explore/           # Character exploration page
│   ├── search/            # Character search page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── CharacterCard.tsx # Character display component
│   └── NarutoChatbot.tsx # Interactive chatbot
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Themes
The app uses a Naruto-inspired color scheme:
- **Primary**: Orange (`#ff6b35`) to Red (`#d73027`)
- **Secondary**: Blue (`#0066cc`) to Cyan (`#00ccff`)
- **Accent**: Yellow (`#ffcc02`) to Orange (`#ff6b35`)

### Adding Characters
To add new characters to the chatbot database, edit `components/NarutoChatbot.tsx`:
```typescript
const CHARACTER_DATABASE = {
  'new-character': {
    name: 'Character Name',
    anime: 'Anime Series',
    description: 'Character description...',
    abilities: ['Ability 1', 'Ability 2'],
    quote: 'Famous quote...'
  }
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Naruto Series**: For the amazing characters and inspiration
- **Next.js Team**: For the incredible framework
- **Framer Motion**: For smooth animations
- **shadcn/ui**: For beautiful UI components
- **Tailwind CSS**: For utility-first styling

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Believe it!** 🍥 This project embodies the ninja way of never giving up and always striving to improve! 