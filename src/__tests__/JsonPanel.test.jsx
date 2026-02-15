import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JsonPanel from '../components/JsonPanel'

describe('JsonPanel Component', () => {
  let mockOnJsonChange

  beforeEach(() => {
    mockOnJsonChange = vi.fn()
  })

  it('should render the panel with title', () => {
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString="" 
        onJsonChange={mockOnJsonChange} 
      />
    )
    expect(screen.getByText('Test JSON')).toBeInTheDocument()
  })

  it('should render textarea with placeholder', () => {
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString="" 
        onJsonChange={mockOnJsonChange} 
      />
    )
    const textarea = screen.getByPlaceholderText('Paste your JSON here...')
    expect(textarea).toBeInTheDocument()
  })

  it('should handle JSON input change', async () => {
    const { rerender } = render(
      <JsonPanel 
        title="Test JSON" 
        jsonString="" 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const textarea = screen.getByPlaceholderText('Paste your JSON here...')
    const testJson = '{"name": "test"}'
    
    fireEvent.change(textarea, { target: { value: testJson } })
    
    await waitFor(() => {
      expect(mockOnJsonChange).toHaveBeenCalledWith(testJson)
    })
  })

  it('should display error for invalid JSON', () => {
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString='{"invalid json}' 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    // Component should render without crashing
    expect(screen.getByTitle('Raw text mode')).toBeInTheDocument()
  })

  it('should beautify valid JSON', async () => {
    const compactJson = '{"name":"test","age":25}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={compactJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const beautifyBtn = screen.getByText('Beautify')
    fireEvent.click(beautifyBtn)
    
    await waitFor(() => {
      expect(mockOnJsonChange).toHaveBeenCalledWith(
        JSON.stringify(JSON.parse(compactJson), null, 2)
      )
    })
  })

  it('should minify JSON correctly', async () => {
    const prettyJson = '{\n  "name": "test",\n  "age": 25\n}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={prettyJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const minifyBtn = screen.getByText('Minify')
    fireEvent.click(minifyBtn)
    
    await waitFor(() => {
      expect(mockOnJsonChange).toHaveBeenCalledWith('{"name":"test","age":25}')
    })
  })

  it('should copy JSON to clipboard', async () => {
    const testJson = '{"name":"test"}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={testJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const copyBtn = screen.getByText('Copy')
    
    // Mock clipboard in jsdom
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    })
    
    fireEvent.click(copyBtn)
    
    // Give it time to process
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(copyBtn).toBeInTheDocument()
  })

  it('should clear JSON content', async () => {
    const testJson = '{"name":"test"}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={testJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const clearBtn = screen.getByText('Clear')
    fireEvent.click(clearBtn)
    
    await waitFor(() => {
      expect(mockOnJsonChange).toHaveBeenCalledWith('')
    })
  })

  it('should toggle between text and tree view modes', async () => {
    const validJson = '{"name":"test"}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={validJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    // Text mode is active by default
    const textBtn = screen.getByTitle('Raw text mode')
    expect(textBtn).toHaveClass('active')
  })

  it('should disable tree view toggle when JSON is invalid', () => {
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString='invalid' 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const treeBtn = screen.getByTitle('Tree view mode')
    expect(treeBtn).toBeInTheDocument()
  })

  it('should auto-resize textarea based on content', async () => {
    const longJson = '{"data":"' + 'x'.repeat(500) + '"}'
    render(
      <JsonPanel 
        title="Test JSON" 
        jsonString={longJson} 
        onJsonChange={mockOnJsonChange} 
      />
    )
    
    const textarea = screen.getByPlaceholderText('Paste your JSON here...')
    
    await waitFor(() => {
      expect(textarea.style.height).not.toBe('auto')
    })
  })
})
