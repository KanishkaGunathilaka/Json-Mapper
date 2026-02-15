# JSON Mapper - TestSprite Test Setup Guide

## Overview
Your JSON Mapper project is now configured with comprehensive TestSprite tests covering all major components:
- **App.jsx** - Main application component
- **JsonPanel.jsx** - JSON input and visualization panels
- **JsonTree.jsx** - Interactive JSON tree component
- **MappingTable.jsx** - Field mapping table

## Test Files Created
- `src/__tests__/App.test.jsx` - 12 test cases for main app
- `src/__tests__/JsonPanel.test.jsx` - 11 test cases for JSON panel
- `src/__tests__/JsonTree.test.jsx` - 11 test cases for JSON tree
- `src/__tests__/MappingTable.test.jsx` - 12 test cases for mapping table

**Total: 46 test cases**

## Running Tests

### Run all tests once
```bash
npm run test:run
```

### Run tests in watch mode (interactive)
```bash
npm run test
```

### Run tests with UI dashboard
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Configuration
- **Framework**: Vitest (fast unit testing)
- **Testing Library**: React Testing Library (component testing)
- **Environment**: jsdom (browser simulation)
- **Config File**: `vitest.config.js`

## TestSprite Integration
TestSprite MCP Server is configured in `.vscode/settings.json`:
```json
{
  "mcpServers": {
    "TestSprite": {
      "command": "npx",
      "args": ["@testsprite/testsprite-mcp@latest"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## Test Coverage

### App Component Tests (12 tests)
✓ Renders app header
✓ Renders split view with two panels
✓ Updates left/right JSON on input
✓ Beautifies/minifies JSON
✓ Displays mapping table for valid JSON
✓ Toggles between text and tree views
✓ Handles invalid JSON gracefully
✓ Clears JSON content
✓ Renders implementation plan section
✓ Synchronizes mappings state
✓ Handles large JSON files
✓ Copies JSON to clipboard

### JsonPanel Component Tests (11 tests)
✓ Renders panel with title
✓ Renders textarea with placeholder
✓ Handles JSON input changes
✓ Displays errors for invalid JSON
✓ Beautifies valid JSON
✓ Minifies JSON correctly
✓ Copies JSON to clipboard
✓ Clears JSON content
✓ Toggles between text and tree view modes
✓ Disables tree view for invalid JSON
✓ Auto-resizes textarea based on content

### JsonTree Component Tests (11 tests)
✓ Renders primitive values (string, number, boolean)
✓ Renders objects and arrays with counts
✓ Renders nested objects correctly
✓ Expands and collapses nodes
✓ Handles empty objects and arrays
✓ Handles deeply nested structures
✓ Handles various data types in arrays
✓ Renders numeric keys in objects
✓ Auto-expands first 2 levels
✓ Shows proper tree formatting

### MappingTable Component Tests (12 tests)
✓ Returns null when no left JSON fields
✓ Displays mapping table header
✓ Extracts leaf fields from JSON
✓ Displays select dropdowns for mapping
✓ Handles field selection
✓ Deselects field on same selection
✓ Handles deeply nested JSON fields
✓ Handles array fields
✓ Only shows leaf nodes in left fields
✓ Gracefully handles invalid JSON
✓ Sorts fields alphabetically
✓ Preserves existing mappings

## Key Testing Patterns Used

### 1. Component Rendering
```javascript
render(<Component prop={value} />)
expect(screen.getByText('text')).toBeInTheDocument()
```

### 2. User Input Simulation
```javascript
fireEvent.change(textarea, { target: { value: newValue } })
fireEvent.click(button)
```

### 3. Async Operations
```javascript
await waitFor(() => {
  expect(element).toBeInTheDocument()
})
```

### 4. Mock Functions
```javascript
const mockFn = vi.fn()
fireEvent.click(button)
expect(mockFn).toHaveBeenCalled()
```

## Debugging Tests

### Show detailed test output
```bash
npm run test:run -- --reporter=verbose
```

### Run specific test file
```bash
npm run test:run -- src/__tests__/JsonPanel.test.jsx
```

### Run tests with specific pattern
```bash
npm run test:run -- --grep="should render"
```

## Next Steps

1. **Run the full test suite**: `npm run test:run`
2. **Review test results** and fix any failures
3. **Add integration tests** for multi-component workflows
4. **Set up CI/CD** to run tests on every commit
5. **Monitor coverage** to maintain high code quality

## Dependencies Added
```json
{
  "@testing-library/jest-dom": "latest",
  "@testing-library/react": "latest",
  "jsdom": "latest",
  "vitest": "latest",
  "@testsprite/testsprite-mcp": "latest"
}
```

## Troubleshooting

### Tests hanging or timing out
Increase timeout in vitest.config.js:
```javascript
test: {
  testTimeout: 10000
}
```

### Module not found errors
Ensure all imports match the actual file structure:
```bash
npm run test:run -- --reporter=verbose
```

### Snapshot failures
Update snapshots when intentional changes are made:
```bash
npm run test:run -- -u
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [TestSprite MCP](https://testsprite.io/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
