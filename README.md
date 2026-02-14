# JSON Mapper

A premium side-by-side JSON mapper and visualizer built with React and Vite.

## Features

- **Split View**: Side-by-side comparison of two JSON documents
- **Auto-expanding Text Areas**: Textarea automatically adjusts height based on content
- **JSON Beautification**: Format and minify JSON with one click
- **Tree Visualization**: Interactive tree view with expandable/collapsible nodes
- **Syntax Highlighting**: Color-coded JSON elements (keys, strings, numbers, booleans)
- **Error Handling**: Clear error messages for invalid JSON
- **Copy to Clipboard**: Quick copy functionality
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Premium glassmorphism design with dark mode

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Icons**: lucide-react
- **Styling**: Vanilla CSS with CSS Variables
- **Language**: JavaScript (JSX)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx              # Main application component
├── App.css              # App layout styles
├── index.css            # Global styles and CSS variables
├── main.jsx             # React entry point
└── components/
    ├── JsonPanel.jsx    # Reusable JSON panel component
    ├── JsonPanel.css    # JsonPanel styles
    ├── JsonTree.jsx     # Tree visualization component
    └── JsonTree.css     # JsonTree styles
```

## Components

### App
Root component managing state for both JSON panels and overall layout.

### JsonPanel
Reusable component for each side of the mapper. Features:
- Text input mode with auto-resizing textarea
- Tree visualization mode
- Beautify/Minify functionality
- Copy, clear, and error handling

### JsonTree
Recursive component for rendering JSON as an interactive tree:
- Expandable/collapsible nodes
- Syntax highlighting
- Handles complex nested structures
- Auto-expands first 2 levels

## Usage

1. Paste JSON in either text area
2. Use "Beautify" to format or "Minify" to compress
3. Switch to "Tree" mode to see visual structure
4. Click arrows to expand/collapse nodes
5. Use "Copy" to copy to clipboard
6. Use "Clear" to reset

## Color Scheme

The application uses a premium dark theme with:
- Indigo primary accent (`#6366f1`)
- Dark blue backgrounds
- Glassmorphism effects
- Syntax-highlighted colors for JSON elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
