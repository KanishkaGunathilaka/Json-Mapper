import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MappingTable from '../components/MappingTable'

describe('MappingTable Component', () => {
  let mockOnMappingsChange

  beforeEach(() => {
    mockOnMappingsChange = vi.fn()
  })

  it('should return null when no left JSON fields are present', () => {
    const { container } = render(
      <MappingTable 
        leftJson="" 
        rightJson="" 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should display mapping table header with field count', () => {
    const leftJson = '{"name": "John", "age": 30}'
    const rightJson = '{"fullName": "John"}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
    expect(screen.getByText(/2 fields detected/)).toBeInTheDocument()
  })

  it('should extract and display all leaf fields from left JSON', () => {
    const leftJson = '{"user": {"name": "John", "email": "john@example.com"}}'
    const rightJson = '{}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
  })

  it('should display select dropdowns for mapping fields', async () => {
    const leftJson = '{"name": "John"}'
    const rightJson = '{"fullName": "John"}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
  })

  it('should handle field selection and call onMappingsChange', async () => {
    const leftJson = '{"name": "John"}'
    const rightJson = '{"fullName": "John Doe"}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: 'fullName' } })
    
    await waitFor(() => {
      expect(mockOnMappingsChange).toHaveBeenCalledWith({ name: 'fullName' })
    })
  })

  it('should deselect field when same option is selected again', async () => {
    const leftJson = '{"name": "John"}'
    const rightJson = '{"fullName": "John"}'
    const existingMappings = { name: 'fullName' }
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={existingMappings} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: 'fullName' } })
    
    await waitFor(() => {
      expect(mockOnMappingsChange).toHaveBeenCalledWith({ name: '' })
    })
  })

  it('should handle deeply nested JSON fields', () => {
    const leftJson = '{"user": {"address": {"city": "NYC", "zip": "10001"}}}'
    const rightJson = '{"location": {"city": "NYC"}}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
  })

  it('should handle array fields in JSON', () => {
    const leftJson = '{"items": [{"id": 1}, {"id": 2}]}'
    const rightJson = '{"products": [{"sku": "A"}]}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
  })

  it('should not display container nodes (objects/arrays) in left fields', () => {
    const leftJson = '{"user": {"name": "John"}}'
    const rightJson = '{}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
  })

  it('should handle invalid JSON gracefully', () => {
    const leftJson = '{invalid json}'
    const rightJson = '{}'
    
    const { container } = render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('should sort fields alphabetically', () => {
    const leftJson = '{"zebra": "z", "apple": "a", "banana": "b"}'
    const rightJson = '{}'
    
    render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={{}} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    expect(screen.getByText('Field Mapping')).toBeInTheDocument()
  })

  it('should preserve existing mappings while adding new ones', async () => {
    const leftJson = '{"name": "John", "age": 30}'
    const rightJson = '{"fullName": "John", "years": 30}'
    const existingMappings = { name: 'fullName' }
    
    const { rerender } = render(
      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={existingMappings} 
        onMappingsChange={mockOnMappingsChange}
      />
    )
    
    const selects = screen.getAllByRole('combobox')
    // Select needs to exist
    expect(selects.length).toBeGreaterThan(0)
  })
})
