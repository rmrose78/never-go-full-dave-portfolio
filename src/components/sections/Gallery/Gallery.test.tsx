import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Gallery } from './Gallery'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'

expect.extend(toHaveNoViolations)

describe('Gallery Section Component', () => {
  it('renders section title, kicker, filter tabs and all 6 portfolio cards initially', () => {
    render(<Gallery />)

    expect(screen.getByText('Miniature Portfolio')).toBeInTheDocument()
    expect(screen.getByText('The Painted Vault')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All Armies/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Astra Militarum/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Khorne Chaos/ })).toBeInTheDocument()

    const cards = screen.getAllByRole('button', { name: /Cadian Command|Death Korps|Leman Russ|Bloodletter|Skullreaper|Khorne Lord/ })
    expect(cards.length).toBe(6)
  })

  it('filters gallery cards when Astra Militarum filter tab is clicked', () => {
    render(<Gallery />)

    const amTab = screen.getByRole('tab', { name: /Astra Militarum/ })
    fireEvent.click(amTab)

    expect(amTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Cadian Command Squad')).toBeInTheDocument()
    expect(screen.getByText('Death Korps Trench Line')).toBeInTheDocument()
    expect(screen.getByText('Leman Russ Weathering Study')).toBeInTheDocument()

    expect(screen.queryByText('Bloodletter Vanguard')).not.toBeInTheDocument()
    expect(screen.queryByText('Skullreaper Warband')).not.toBeInTheDocument()
    expect(screen.queryByText('Khorne Lord on Juggernaut')).not.toBeInTheDocument()
  })

  it('filters gallery cards when Khorne Chaos filter tab is clicked', () => {
    render(<Gallery />)

    const khTab = screen.getByRole('tab', { name: /Khorne Chaos/ })
    fireEvent.click(khTab)

    expect(khTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Bloodletter Vanguard')).toBeInTheDocument()
    expect(screen.getByText('Skullreaper Warband')).toBeInTheDocument()
    expect(screen.getByText('Khorne Lord on Juggernaut')).toBeInTheDocument()

    expect(screen.queryByText('Cadian Command Squad')).not.toBeInTheDocument()
  })

  it('triggers onSelectCard callback when a card is clicked', () => {
    const handleSelectCard = jest.fn()
    render(<Gallery onSelectCard={handleSelectCard} />)

    const cardButton = screen.getByTestId('portfolio-card-am1')
    fireEvent.click(cardButton)

    expect(handleSelectCard).toHaveBeenCalledTimes(1)
    expect(handleSelectCard).toHaveBeenCalledWith(PORTFOLIO_ITEMS[0])
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<Gallery />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
