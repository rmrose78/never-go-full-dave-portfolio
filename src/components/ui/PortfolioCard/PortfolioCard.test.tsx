import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PortfolioCard } from './PortfolioCard'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'

expect.extend(toHaveNoViolations)

describe('PortfolioCard', () => {
  const mockItem = PORTFOLIO_ITEMS[0]

  it('renders card title, faction, badge and accessibility label', () => {
    render(<PortfolioCard item={mockItem} />)

    expect(screen.getByText('Cadian Command Squad')).toBeInTheDocument()
    expect(screen.getByText('Astra Militarum')).toBeInTheDocument()
    expect(screen.getByText('Cadian Regiment')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Cadian Command Squad - Astra Militarum (Cadian Regiment)',
      })
    ).toBeInTheDocument()
  })

  it('invokes onSelect when clicked', () => {
    const handleSelect = jest.fn()
    render(<PortfolioCard item={mockItem} onSelect={handleSelect} />)

    const cardButton = screen.getByRole('button')
    fireEvent.click(cardButton)

    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledWith(mockItem)
  })

  it('has no accessibility violations per jest-axe', async () => {
    const { container } = render(<PortfolioCard item={mockItem} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
