import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Header } from './Header'

expect.extend(toHaveNoViolations)

describe('Header Navigation Bar', () => {
  it('renders primary navigation bar with brand link and nav items', () => {
    render(<Header />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /never go full dave studio home/i })
    ).toBeInTheDocument()

    const links = ['Gallery', 'Specialties', 'Standards', 'Commission', 'Showcase', 'About', 'Dispatches']
    links.forEach((linkText) => {
      expect(screen.getByRole('link', { name: linkText })).toBeInTheDocument()
    })
  })

  it('toggles mobile drawer state when hamburger button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes mobile drawer and fires callback when a link is clicked', async () => {
    const user = userEvent.setup()
    const handleLinkClick = jest.fn()
    render(<Header onLinkClick={handleLinkClick} />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    const galleryLink = screen.getByRole('link', { name: 'Gallery' })
    await user.click(galleryLink)

    expect(handleLinkClick).toHaveBeenCalledWith('#gallery')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('passes jest-axe accessibility audit on closed state', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('passes jest-axe accessibility audit on mobile drawer open state', async () => {
    const user = userEvent.setup()
    const { container } = render(<Header />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    await user.click(toggleButton)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
