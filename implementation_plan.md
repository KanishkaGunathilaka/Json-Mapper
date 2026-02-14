# JSON Mapper Application Implementation Plan

This application aims to provide a side-by-side view for mapping two JSON requests. It will feature auto-expanding text areas, JSON beautification, and a collapsible/expandable tree view for navigating the JSON structure.

## User Review Required
> [!IMPORTANT]
> I will be using **React** with **Vite** as a foundation for this application to handle the state management and component interactivity efficiently. Styling will be done with **Vanilla CSS** to ensure maximum customizability and a premium look and feel.

## Proposed Architecture

### Tech Stack
-   **Framework**: React (via Vite)
-   **Language**: JavaScript (JSX)
-   **Styling**: Vanilla CSS (CSS Modules or Global CSS with variables)
-   **Icons**: `lucide-react` or similar lightweight icon library for collapse/expand arrows.

### Component Structure

#### `App.jsx`
The main container.
-   **Layout**: A 2-column grid layout (Split View).
-   **State**:
    -   `leftJson`: String (raw input)
    -   `rightJson`: String (raw input)
    -   `parsedLeft`: Object (parsed JSON)
    -   `parsedRight`: Object (parsed JSON)

#### `JsonPanel.jsx`
A reusable component for each side of the mapper.
-   **Props**: `jsonString`, `onJsonChange`, `title`.
-   **Internal State**:
    -   `mode`: 'text' | 'tree' (Though the requirements imply a unified view or auto-expansion, a toggle might be cleaner, OR we render the tree view *below* or *overlaying* the text. The requirements say "text boxes... upon payload size text fields should be expanded... also formatted to beautify... also each node should be able to expand or compress". This suggests the "text box" *becomes* or *Is* a rich editor or tree view.
    -   *Refinement*: We will likely have a "Raw Input" mode and a "Visual Tree" mode, or a hybrid where the input area transforms into the tree view upon validation. For this plan, I suggest a hybrid approach: A text area for input/editing, and a "View" mode that renders the interactive tree.

#### `JsonTree.jsx`
A recursive component to render JSON nodes.
-   **Props**: `data`, `dataKey`, `level`, `isLast`.
-   **Features**:
    -   Collapsible/Expandable arrows.
    -   Syntax highlighting (keys, strings, numbers, booleans).
    -   Bracket matching indentation.

### Data Flow
1.  User specifices text in the textarea.
2.  `useEffect` listener attempts to parse the JSON.
3.  If valid, it updates the `parsedData` state.
4.  The `JsonTree` component renders the `parsedData`.
5.  "Beautify" button manually triggers formatting of the raw text string in the textarea.

## Implementation Steps

### 1. Initialization
-   Setup Vite + React project.
-   Clean up default styles.
-   Define CSS variables for the color palette (Dark mode, premium accents).

### 2. Core Components
-   **`SplitView`**: A CSS Grid container.
-   **`JsonEditor`**: A wrapper around `textarea` with auto-resize logic. Use a hidden `div` to calculate height or simple `scrollHeight` adjustments.

### 3. Tree Visualization
-   Implement the logic to traverse the JSON object.
-   Create the interactive DOM elements for the tree structure.
-   Add click handlers for toggle visibility of children nodes.

### 4. Styling
-   Implement "Glassmorphism" background.
-   Use a monospaced font (e.g., 'Fira Code' or 'Roboto Mono') for code.
-   Add hover effects and smooth transitions for expansions.

## Verification Plan

### Automated Tests
-   Not strictly required for this prototype, but could add basic Unit tests for the JSON parser helper if logic gets complex.

### Manual Verification
-   **Large JSON**: Paste a 1MB+ JSON file to check performance.
-   **Invalid JSON**: Ensure the app doesn't crash and shows an error state.
-   **Deep Nesting**: Verify the recursive tree handles deep structures correctly.
