import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { App } from './App'

expect.extend(toHaveNoViolations)

describe('App Layout Scaffold', () => {
  it('renders primary header navigation, main container, site footer, and audio widget', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo', { name: /site footer/i })).toBeInTheDocument()
    expect(screen.getByTestId('industrial-audio-widget')).toBeInTheDocument()
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
