import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Hero } from './Hero'

expect.extend(toHaveNoViolations)

describe('Hero Section Component', () => {
  it('renders title, emblem, warning badge, tagline, CTA button, and purity seal', () => {
    render(<Hero enableScramble={false} />)

    expect(screen.getByRole('region', { name: /hero showcase entrance/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /never go full dave/i })).toBeInTheDocument()
    expect(screen.getByText(/commission miniature painting • warhammer 40k & age of sigmar/i)).toBeInTheDocument()
    expect(screen.getByText(/display-grade painting, clean edge work/i)).toBeInTheDocument()

    const ctaButton = screen.getByRole('link', { name: /explore the portfolio/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '#gallery')

    expect(screen.getByTestId('purity-seal')).toBeInTheDocument()
  })

  it('renders custom title and CTA href props correctly', () => {
    render(
      <Hero
        title="CUSTOM TITLE DAVE"
        ctaText="Custom CTA"
        ctaHref="#custom-link"
        enableScramble={false}
      />
    )

    expect(screen.getByRole('heading', { level: 1, name: /custom title dave/i })).toBeInTheDocument()
    const ctaButton = screen.getByRole('link', { name: /custom cta/i })
    expect(ctaButton).toHaveAttribute('href', '#custom-link')
  })

  it('passes jest-axe accessibility audit', async () => {
    const { container } = render(<Hero enableScramble={false} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
