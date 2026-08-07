import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Specialties } from './Specialties'

expect.extend(toHaveNoViolations)

describe('Specialties Section Component', () => {
  it('renders section title, kicker, lede and all 4 capability cards', () => {
    render(<Specialties />)

    expect(screen.getByText('Painting Capabilities')).toBeInTheDocument()
    expect(screen.getByText('Specialties & Unit Types')).toBeInTheDocument()

    expect(screen.getByText('Troops & Squads')).toBeInTheDocument()
    expect(screen.getByText('Heroes & Characters')).toBeInTheDocument()
    expect(screen.getByText('Vehicles & Armor')).toBeInTheDocument()
    expect(screen.getByText('Dioramas & Basing')).toBeInTheDocument()
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<Specialties />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
