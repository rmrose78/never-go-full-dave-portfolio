import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { App } from './App'

expect.extend(toHaveNoViolations)

describe('App Layout Scaffold', () => {
  it('renders primary header navigation and studio emblem correctly', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument()
    expect(screen.getByTestId('studio-emblem')).toBeInTheDocument()
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
  })

  it('renders custom children when passed', () => {
    render(
      <App>
        <div data-testid="custom-content">Custom Content</div>
      </App>
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('passes jest-axe accessibility audit', async () => {
    const { container } = render(<App />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
