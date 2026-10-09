import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CommissionForm } from './CommissionForm'
import * as clipboardModule from '@/utils/clipboard'

expect.extend(toHaveNoViolations)

describe('CommissionForm Section Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders section headers, all 5 form fields, and action buttons', () => {
    render(<CommissionForm />)

    expect(screen.getByText('Commission Request')).toBeInTheDocument()
    expect(screen.getByText('Request a Custom Quote')).toBeInTheDocument()

    // Form inputs and labels
    expect(screen.getByLabelText(/1\. Faction \/ Army \/ Game/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/2\. Model Type & Quantity/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/3\. Current Assembly State/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/4\. Desired Painting Standard/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/5\. Custom Notes, Color Preferences, or Reference Photo Links/i)
    ).toBeInTheDocument()

    // Action buttons
    expect(screen.getByRole('link', { name: /Transmit quote request email to Dave/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Copy inquiry specs to clipboard/i })).toBeInTheDocument()
  })

  it('updates form fields and updates mailto link dynamically', () => {
    render(<CommissionForm />)

    const armyInput = screen.getByLabelText(/1\. Faction \/ Army \/ Game/i)
    const unitSelect = screen.getByLabelText(/2\. Model Type & Quantity/i)
    const notesInput = screen.getByLabelText(/5\. Custom Notes, Color Preferences/i)
    const transmitBtn = screen.getByRole('link', { name: /Transmit quote request email to Dave/i })

    fireEvent.change(armyInput, { target: { value: 'Astra Militarum' } })
    fireEvent.change(unitSelect, { target: { value: 'Vehicle / Monster' } })
    fireEvent.change(notesInput, { target: { value: 'Leman Russ tank in muddy camouflage' } })

    expect(transmitBtn).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Astra Militarum'))
    )
    expect(transmitBtn).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Vehicle / Monster'))
    )
    expect(transmitBtn).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Leman Russ tank in muddy camouflage'))
    )
  })

  it('triggers copySpecs when copy button is clicked', async () => {
    const copySpy = jest.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(true)
    render(<CommissionForm />)

    const copyBtn = screen.getByRole('button', { name: /Copy inquiry specs to clipboard/i })
    fireEvent.click(copyBtn)

    await waitFor(() => {
      expect(copySpy).toHaveBeenCalled()
      expect(screen.getByText('Specs Copied!')).toBeInTheDocument()
    })
  })

  it('has zero accessibility violations per jest-axe on initial render', async () => {
    const { container } = render(<CommissionForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has zero accessibility violations per jest-axe when copied', async () => {
    jest.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(true)
    const { container } = render(<CommissionForm />)

    const copyBtn = screen.getByRole('button', { name: /Copy inquiry specs to clipboard/i })
    fireEvent.click(copyBtn)

    await waitFor(() => {
      expect(screen.getByText('Specs Copied!')).toBeInTheDocument()
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
