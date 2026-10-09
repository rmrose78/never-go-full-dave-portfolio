import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AboutBio } from './AboutBio'

expect.extend(toHaveNoViolations)

describe('AboutBio Section Component', () => {
  it('renders artist name, role, credentials, kicker, title, and bio text', () => {
    render(<AboutBio />)

    expect(screen.getByText('Meet Dave')).toBeInTheDocument()
    expect(screen.getByText('Artist & Studio Lead')).toBeInTheDocument()
    expect(screen.getByText(/Former US Army Officer/i)).toBeInTheDocument()
    expect(screen.getByText('Behind The Paintbrush')).toBeInTheDocument()
    expect(screen.getByText('Precision, Patience & Discipline')).toBeInTheDocument()
    expect(screen.getByText(/Before setting up the paint desk/i)).toBeInTheDocument()
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<AboutBio />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
