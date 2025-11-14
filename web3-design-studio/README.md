# Web3 Design Studio

Visual playground for building animated Web3 interfaces.

## Features

- 🎨 8 Psychedelic Animation Backgrounds
- 🎮 Drag & Drop Component Builder
- 🎛️ Real-time Parameter Controls
- 📤 Production Code Export
- 🌐 Web3 Integration (Solana)
- 📊 Live Trading Components

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the studio.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **State:** Zustand
- **Web3:** Solana (@solana/web3.js)
- **Charts:** Lightweight Charts

## Project Structure

```
web3-design-studio/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── animations/         # Psychedelic backgrounds
│   │   ├── trading/            # Trading components
│   │   ├── studio/             # Studio UI
│   │   └── controls/           # Parameter controls
│   └── lib/
│       ├── store/              # Zustand state
│       ├── animations/         # Animation engines
│       └── utils/              # Utilities
└── public/                     # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
