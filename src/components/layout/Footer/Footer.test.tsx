import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Footer } from './Footer'

expect.extend(toHaveNoViolations)

describe('Footer Component', () => {
  it('renders studio seal emblem, Instagram link, and copyright notice', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo', { name: /site footer/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /never go full dave studio seal/i })).toBeInTheDocument()

    const socialLink = screen.getByRole('link', { name: /instagram @nevergofulldave/i })
    expect(socialLink).toBeInTheDocument()
    expect(socialLink).toHaveAttribute('href', 'https://instagram.com/nevergofulldave')
    expect(socialLink).toHaveAttribute('target', '_blank')
    expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(
      screen.getByText(/© 2026 Never Go Full Dave. All rights reserved./i)
    ).toBeInTheDocument()
  })

  it('renders custom props when provided', () => {
    render(
      <Footer
        instagramUrl="https://instagram.com/custom"
        copyrightText="© 2026 Custom Copyright Notice"
      />
    )

    const socialLink = screen.getByRole('link', { name: /instagram @nevergofulldave/i })
    expect(socialLink).toHaveAttribute('href', 'https://instagram.com/custom')
    expect(screen.getByText(/© 2026 Custom Copyright Notice/i)).toBeInTheDocument()
  })

  it('passes jest-axe accessibility audit', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
