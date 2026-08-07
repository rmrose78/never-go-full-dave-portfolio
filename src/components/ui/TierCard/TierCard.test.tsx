import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TierCard } from './TierCard'
import { PRICING_TIERS } from '@/data/pricing'

expect.extend(toHaveNoViolations)

describe('TierCard UI Component', () => {
  it('renders standard pricing tier with kicker, name, price and features', () => {
    render(<TierCard tier={PRICING_TIERS[0]} />)

    expect(screen.getByText('Standard 01')).toBeInTheDocument()
    expect(screen.getByText('Tabletop Ready')).toBeInTheDocument()
    expect(screen.getByText('$40 - $70')).toBeInTheDocument()
    expect(screen.getByText('/ model avg')).toBeInTheDocument()
    expect(screen.getByText('Three-color base scheme plus shade wash')).toBeInTheDocument()
  })

  it('renders centerpiece masterpiece tier card with special centerpiece styling', () => {
    render(<TierCard tier={PRICING_TIERS[2]} />)

    expect(screen.getByText('Centerpiece Masterpiece')).toBeInTheDocument()
    expect(screen.getByText('Custom Quote')).toBeInTheDocument()
    const card = screen.getByTestId('tier-card-tier-03')
    expect(card).toHaveAttribute('data-centerpiece', 'true')
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<TierCard tier={PRICING_TIERS[0]} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
