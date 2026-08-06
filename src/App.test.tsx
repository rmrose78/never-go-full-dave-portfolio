import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import App from './App'

expect.extend(toHaveNoViolations)

describe('App', () => {
  it('renders the heading and brand emblem', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /never go full dave/i })
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<App />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
