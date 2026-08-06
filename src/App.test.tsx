import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import App from './App'

expect.extend(toHaveNoViolations)

describe('App', () => {
  it('renders primary header navigation and brand emblem', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<App />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
