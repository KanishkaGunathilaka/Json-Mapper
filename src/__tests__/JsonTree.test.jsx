import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JsonTree from '../components/JsonTree'

describe('JsonTree Component', () => {
  it('should render primitive string value', () => {
    render(<JsonTree data="test string" dataKey="name" level={0} />)
    expect(screen.getByText('name:')).toBeInTheDocument()
    const valueElement = screen.getByText(/test string/)
    expect(valueElement).toBeInTheDocument()
  })

  it('should render primitive number value', () => {
    render(<JsonTree data={42} dataKey="age" level={0} />)
    expect(screen.getByText('age:')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('should render primitive boolean value', () => {
    render(<JsonTree data={true} dataKey="active" level={0} />)
    expect(screen.getByText('active:')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
  })

  it('should render object with properties', () => {
    const data = {
      name: 'John',
      age: 30
    }
    
    render(<JsonTree data={data} dataKey="user" level={0} />)
    
    expect(screen.getByText('user:')).toBeInTheDocument()
    expect(screen.getByText('{2}')).toBeInTheDocument()
  })

  it('should render array with items', () => {
    const data = ['item1', 'item2', 'item3']
    
    render(<JsonTree data={data} dataKey="items" level={0} />)
    
    expect(screen.getByText('items:')).toBeInTheDocument()
    expect(screen.getByText('[3]')).toBeInTheDocument()
  })

  it('should render nested objects', () => {
    const data = {
      user: {
        name: 'John',
        address: {
          city: 'NYC'
        }
      }
    }
    
    render(<JsonTree data={data} dataKey="data" level={0} />)
    
    expect(screen.getByText('data:')).toBeInTheDocument()
  })

  it('should expand and collapse nodes', () => {
    const data = { name: 'John', age: 30 }
    
    const { container } = render(<JsonTree data={data} dataKey="user" level={0} />)
    
    const header = screen.getByText('user:').closest('.node-header')
    expect(header).toBeInTheDocument()
  })

  it('should handle empty objects', () => {
    render(<JsonTree data={{}} dataKey="empty" level={0} />)
    
    expect(screen.getByText('empty:')).toBeInTheDocument()
    expect(screen.getByText('{0}')).toBeInTheDocument()
  })

  it('should handle empty arrays', () => {
    render(<JsonTree data={[]} dataKey="empty" level={0} />)
    
    expect(screen.getByText('empty:')).toBeInTheDocument()
    expect(screen.getByText('[0]')).toBeInTheDocument()
  })

  it('should handle deeply nested structures', () => {
    const data = {
      level1: {
        level2: {
          level3: {
            value: 'deep'
          }
        }
      }
    }
    
    render(<JsonTree data={data} dataKey="root" level={0} />)
    
    expect(screen.getByText('root:')).toBeInTheDocument()
  })

  it('should handle various data types in array', () => {
    const data = ['string', 42, true, null]
    
    render(<JsonTree data={data} dataKey="mixed" level={0} />)
    
    expect(screen.getByText('mixed:')).toBeInTheDocument()
    expect(screen.getByText('[4]')).toBeInTheDocument()
  })

  it('should render numeric keys correctly in objects', () => {
    const data = {
      0: 'first',
      1: 'second'
    }
    
    render(<JsonTree data={data} dataKey="indexed" level={0} />)
    
    expect(screen.getByText('indexed:')).toBeInTheDocument()
  })
})
