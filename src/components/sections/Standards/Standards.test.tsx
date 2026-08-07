import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Standards } from './Standards'

expect.extend(toHaveNoViolations)

describe('Standards Section Component', () => {
  it('renders section title, kicker, lede and all 3 pricing tier cards', () => {
    render(<Standards />)

    expect(screen.getByText('Painting Benchmarks')).toBeInTheDocument()
    expect(screen.getByText('Quality Standards & Tiers')).toBeInTheDocument()

    expect(screen.getByText('Tabletop Ready')).toBeInTheDocument()
    expect(screen.getByText('Display Quality')).toBeInTheDocument()
    expect(screen.getByText('Centerpiece Masterpiece')).toBeInTheDocument()
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<Standards />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
