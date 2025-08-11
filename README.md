# LGTM Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)

A simple web application for generating LGTM (Looks Good To Me) images. Your uploaded images are processed entirely in your browser and never sent to any server. (Random dog images are fetched from an external API.)

🌐 日本語版READMEは[こちら](README_ja.md)をご覧ください。

## Try It Now

**[🚀 Live Demo](https://obikosato.github.io/lgtm-gen/)**

Sorry, the app is currently available only in Japanese.
We appreciate your understanding and are considering English support in the future.

### How to Use

1. **Upload Image** - Choose your preferred method to add a background image:
   - **Drag & Drop** - Drag an image file directly onto the upload area
   - **File Selection** - Click the upload area to open file dialog
   - **Copy & Paste** - Copy an image from your browser/clipboard and paste with Ctrl+V (⌘+V on Mac)
   - **Random Dog** - Use the random dog button for a quick test image (fetches from an external API)
2. **Select Fit Mode** - Select how the image should fit the canvas
3. **Auto Generation** - LGTM image is generated automatically whenever you make changes
4. **Save or Copy** - Download the image or copy it to your clipboard

## Development

For developers who want to contribute or run locally:

### Prerequisites

- Node.js 20.19.0+
- npm

### Setup

```bash
git clone https://github.com/obikosato/lgtm-gen.git
cd lgtm-gen

# Install dependencies
npm install

# Start development server
npm run dev
```

Open <http://localhost:5173> in your browser.

### Build Commands

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Code quality check (lint + format)
npm run check
```

### Project Structure

```sh
├── src/
│   ├── components/           # React components
│   │   ├── LGTMGenerator/    # Main generator components
│   │   └── Footer.tsx        # Footer component
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   │   └── lgtm-generator.ts # Core image generation logic
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Application root
│   └── main.tsx              # Entry point
├── index.html                # HTML entry point
├── dist/                     # Build output
├── biome.json                # Biome configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── LICENSE                   # MIT license file
```

## Built With

- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[Chakra UI](https://chakra-ui.com/)** - Modular and accessible component library
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[Dog CEO API](https://github.com/ElliottLandsborough/dog-ceo-api)** - Provides random dog images (MIT License)

For detailed attribution information, see [ATTRIBUTION.md](ATTRIBUTION.md).

## Disclaimer

- You are solely responsible for the use of images generated and downloaded from this application
- Please ensure you have proper legal rights (including copyright) to use any images you upload or other content you provide
- The developers assume no responsibility for any damages that may arise from the use of this application
