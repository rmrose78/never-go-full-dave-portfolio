import { render, screen, fireEvent, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { App } from './App'

expect.extend(toHaveNoViolations)

describe('App Layout Scaffold', () => {
  beforeAll(() => {
    // Polyfill HTMLDialogElement methods for JSDOM
    HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
      this.open = true
    })
    HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
      this.open = false
    })
  })

  it('renders primary header navigation, main container with all 8 sections, site footer, and audio widget', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo', { name: /site footer/i })).toBeInTheDocument()
    expect(screen.getByTestId('industrial-audio-widget')).toBeInTheDocument()
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()

    // 8 sections
    expect(screen.getByRole('region', { name: /hero showcase entrance/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /painted vault miniature portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /painting capabilities & specialties/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /quality standards & pricing tiers/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /commission quote request form/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /environment & diorama showcase/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /artist bio & background/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /studio dispatches & hobby desk logs/i })).toBeInTheDocument()
  })

  it('opens recipe detail modal when a portfolio card is selected', () => {
    render(<App />)

    const card = screen.getByTestId('portfolio-card-am1')
    fireEvent.click(card)

    const modal = screen.getByTestId('accessible-modal')
    expect(within(modal).getByRole('heading', { level: 3, name: 'Cadian Command Squad' })).toBeInTheDocument()
    expect(
      within(modal).getByText(/Krieg Khaki basecoat with Agrax Earthshade washes/i)
    ).toBeInTheDocument()
  })

  it('opens dispatch detail modal when a dispatch card is clicked', () => {
    render(<App />)

    const dispatchCard = screen.getByTestId('dispatch-card-post1')
    fireEvent.click(dispatchCard)

    const modal = screen.getByTestId('accessible-modal')
    expect(within(modal).getByRole('heading', { level: 3, name: 'Getting Brass Right (Finally)' })).toBeInTheDocument()
    expect(
      within(modal).getByText(/Non-metallic metal is one of those techniques/i)
    ).toBeInTheDocument()
  })

  it('opens full archive modal when view full archive button is clicked', () => {
    render(<App />)

    const openArchiveBtn = screen.getByTestId('open-archive-btn')
    fireEvent.click(openArchiveBtn)

    const modal = screen.getByTestId('accessible-modal')
    expect(within(modal).getByRole('heading', { level: 3, name: 'Full Dispatches Archive' })).toBeInTheDocument()
    expect(screen.getByTestId('archive-item-post4')).toBeInTheDocument()
    expect(screen.getByTestId('archive-item-post5')).toBeInTheDocument()
  })

  it('renders custom children when passed', () => {
    render(
      <App>
        <div data-testid="custom-content">Custom Content</div>
      </App>
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('passes jest-axe accessibility audit on full app', async () => {
    const { container } = render(<App />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
