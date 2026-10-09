import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Showcase } from './Showcase'

expect.extend(toHaveNoViolations)

describe('Showcase Section Component', () => {
  it('renders section title, kicker, descriptions, tags, and diorama image', () => {
    render(<Showcase />)

    expect(screen.getByText('Environment & Diorama')).toBeInTheDocument()
    expect(screen.getByText(/When It's a Whole Scene/i)).toBeInTheDocument()
    expect(screen.getByText(/Some commissions extend beyond single models/i)).toBeInTheDocument()

    expect(screen.getByText('Sculpted Terrain')).toBeInTheDocument()
    expect(screen.getByText('Multi-Model Scenes')).toBeInTheDocument()
    expect(screen.getByText('OSL & Weathering')).toBeInTheDocument()

    const img = screen.getByRole('img', { name: /Centerpiece diorama photo study/i })
    expect(img).toBeInTheDocument()
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<Showcase />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
